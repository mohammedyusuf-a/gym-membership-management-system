const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');

// GET settings
router.get('/', async (req, res) => {
  try {
    let setting = await Setting.findOne({ key: 'gym_settings' });
    if (!setting) {
      setting = await Setting.create({
        key: 'gym_settings',
        gymName: 'TITAN IRON GYM',
        tagline: 'PREMIER GYM MEMBERSHIP MANAGEMENT SYSTEM',
        currency: '₹',
        upiId: 'titanirongym@okaxis',
        phone: '+91 98400 12345',
        address: 'Plot 42, Anna Salai, Chennai, Tamil Nadu 600002'
      });
    }
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update settings
router.put('/', async (req, res) => {
  try {
    const updated = await Setting.findOneAndUpdate(
      { key: 'gym_settings' },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json({ success: true, settings: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
