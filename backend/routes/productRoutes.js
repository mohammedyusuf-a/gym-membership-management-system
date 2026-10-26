const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Member = require('../models/Member');
const Invoice = require('../models/Invoice');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST purchase product
router.post('/purchase', async (req, res) => {
  try {
    const { productId, memberId, paymentMethod = 'UPI (Google Pay)', qty = 1 } = req.body;
    const product = await Product.findOne({ id: productId });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    if (product.stock < qty) {
      return res.status(400).json({ success: false, message: `Out of stock! Only ${product.stock} items remaining.` });
    }

    product.stock -= qty;
    if (product.stock <= 0) product.inStock = false;
    await product.save();

    let member = null;
    if (memberId) {
      member = await Member.findOne({ id: memberId });
    }
    const memberName = member ? member.fullName : 'Pro Shop Customer';

    const count = await Invoice.countDocuments();
    const invoice = new Invoice({
      id: `INV-2026-${String(count + 101).padStart(3, '0')}`,
      memberId: member ? member.id : '',
      memberName: memberName,
      planName: `Pro Shop: ${product.name} (Qty: ${qty})`,
      amount: product.price * qty,
      paymentMethod: paymentMethod,
      date: new Date().toISOString().split('T')[0],
      status: 'Paid',
      reference: `SHOP-${Date.now().toString().slice(-6)}`
    });
    await invoice.save();

    res.json({
      success: true,
      message: `Purchased ${product.name} for ₹${(product.price * qty).toLocaleString('en-IN')}. Saved to MongoDB!`,
      invoice,
      product
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
