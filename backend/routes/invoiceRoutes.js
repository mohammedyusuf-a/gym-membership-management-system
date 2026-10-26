const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// GET all invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find({}).sort({ createdAt: -1 });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create invoice
router.post('/', async (req, res) => {
  try {
    const inv = req.body;
    const count = await Invoice.countDocuments();
    const nextId = inv.id || `INV-2026-${String(count + 101).padStart(3, '0')}`;

    const newInvoice = new Invoice({
      id: nextId,
      memberId: inv.memberId || '',
      memberName: inv.memberName,
      planName: inv.planName,
      amount: parseFloat(inv.amount),
      paymentMethod: inv.paymentMethod || 'UPI (Google Pay)',
      date: inv.date || new Date().toISOString().split('T')[0],
      status: inv.status || 'Paid',
      reference: inv.reference || `REF-${Math.floor(Math.random() * 899999 + 100000)}`
    });

    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
