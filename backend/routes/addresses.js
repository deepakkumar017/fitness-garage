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

// Get user addresses
router.get('/', verifyToken, async (req, res) => {
  try {
    const userDoc = await db.collection('users').doc(req.user.id).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const addresses = userDoc.data().addresses || [];
    res.json(addresses);
  } catch (error) {
    console.error('Get addresses error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add address
router.post('/', verifyToken, async (req, res) => {
  try {
    const { street, city, state, zip, phone, label, isDefault } = req.body;
    
    const address = {
      id: Date.now().toString(),
      street,
      city,
      state,
      zip,
      phone,
      label,
      isDefault: isDefault || false,
      createdAt: new Date()
    };

    await db.collection('users').doc(req.user.id).update({
      addresses: db.FieldValue.arrayUnion(address)
    });

    res.status(201).json(address);
  } catch (error) {
    console.error('Add address error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update address
router.put('/:addressId', verifyToken, async (req, res) => {
  try {
    const userDoc = await db.collection('users').doc(req.user.id).get();
    const addresses = userDoc.data().addresses || [];
    
    const addressIndex = addresses.findIndex(a => a.id === req.params.addressId);
    if (addressIndex === -1) {
      return res.status(404).json({ error: 'Address not found' });
    }

    addresses[addressIndex] = {
      ...addresses[addressIndex],
      ...req.body,
      updatedAt: new Date()
    };

    await db.collection('users').doc(req.user.id).update({ addresses });

    res.json(addresses[addressIndex]);
  } catch (error) {
    console.error('Update address error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete address
router.delete('/:addressId', verifyToken, async (req, res) => {
  try {
    const userDoc = await db.collection('users').doc(req.user.id).get();
    const addresses = userDoc.data().addresses || [];
    
    const filteredAddresses = addresses.filter(a => a.id !== req.params.addressId);

    await db.collection('users').doc(req.user.id).update({ addresses: filteredAddresses });

    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Delete address error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
