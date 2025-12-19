const express = require('express');
const { db } = require('../config/firebase');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const category = req.query.category;
    let query = db.collection('products');

    if (category) {
      query = query.where('category', '==', category);
    }

    const snapshot = await query.get();
    const products = [];

    snapshot.forEach(doc => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('products').doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      id: doc.id,
      ...doc.data()
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
