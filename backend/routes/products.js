const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Products fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Product creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;