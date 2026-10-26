const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');
const Member = require('../models/Member');

// GET all plans with live active member counts
router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find({});
    const members = await Member.find({ status: { $ne: 'Expired' } });

    const results = plans.map(p => {
      const count = members.filter(m => m.planId === p.id).length;
      const obj = p.toObject();
      return { ...obj, activeMembers: count };
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single plan
router.get('/:id', async (req, res) => {
  try {
    const plan = await Plan.findOne({ id: req.params.id });
    if (!plan) return res.status(404).json({ error: 'Plan not found' });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add plan
router.post('/', async (req, res) => {
  try {
    const newPlan = new Plan(req.body);
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
