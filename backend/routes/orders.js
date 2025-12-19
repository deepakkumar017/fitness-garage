const express = require('express');
const jwt = require('jsonwebtoken');
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

// Create order
router.post('/', verifyToken, async (req, res) => {
  try {
    const { items, address, paymentId, total } = req.body;

    const order = {
      userId: req.user.id,
      items,
      address,
      paymentId,
      total,
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await db.collection('orders').add(order);

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

    res.status(201).json({
      id: docRef.id,
      ...order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get user orders
router.get('/', verifyToken, async (req, res) => {
  try {
    const snapshot = await db.collection('orders')
      .where('userId', '==', req.user.id)
      .orderBy('createdAt', 'desc')
      .get();

    const orders = [];
    snapshot.forEach(doc => {
      orders.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single order
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const doc = await db.collection('orders').doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const orderData = doc.data();
    
    // Check if user owns this order
    if (orderData.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({
      id: doc.id,
      ...orderData
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
