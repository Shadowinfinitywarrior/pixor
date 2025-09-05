const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const { products } = req.body;
  try {
    let total = 0;
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ message: 'Invalid product or insufficient stock' });
      }
      total += product.price * item.quantity;
      product.stock -= item.quantity;
      await product.save();
    }

    const order = new Order({ userId: req.user.id, products, total });
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find(req.user.role === 'admin' ? {} : { userId: req.user.id }).populate('products.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;