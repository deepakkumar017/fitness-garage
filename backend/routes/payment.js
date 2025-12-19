const express = require('express');
const jwt = require('jsonwebtoken');
const razorpay = require('../config/razorpay');
const { db } = require('../config/firebase');

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Create Razorpay order
router.post('/create-order', verifyToken, async (req, res) => {
  try {
    const { amount, items, addressId } = req.body;

    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: req.user.id,
        addressId,
        items: JSON.stringify(items)
      }
    };

    const order = await razorpay.orders.create(options);

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verify payment
router.post('/verify-payment', verifyToken, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      address,
      total
    } = req.body;

    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Payment verification failed' });
    }

    // Create order in database
    const orderData = {
      userId: req.user.id,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      items,
      address,
      total,
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await db.collection('orders').add(orderData);

    // Update user's orders
    await db.collection('users').doc(req.user.id).update({
      orders: db.FieldValue.arrayUnion({
        id: docRef.id,
        items: items.length,
        total,
        date: new Date().toISOString(),
        status: 'Confirmed'
      })
    });

    res.json({
      success: true,
      orderId: docRef.id,
      message: 'Payment verified and order created'
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
