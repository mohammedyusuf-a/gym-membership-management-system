const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const User = require('../models/User');
const Plan = require('../models/Plan');
const Trainer = require('../models/Trainer');
const Attendance = require('../models/Attendance');
const Invoice = require('../models/Invoice');
const Product = require('../models/Product');
const ClassModel = require('../models/Class');
const Setting = require('../models/Setting');
const { isDBConnected } = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const connected = isDBConnected();
    if (!connected) {
      return res.status(503).json({
        success: false,
        connected: false,
        message: 'MongoDB is currently not connected'
      });
    }

    const [
      members,
      plans,
      trainers,
      attendance,
      invoices,
      products,
      classes,
      users,
      setting
    ] = await Promise.all([
      Member.find({}).sort({ createdAt: -1 }),
      Plan.find({}),
      Trainer.find({}),
      Attendance.find({}).sort({ createdAt: -1 }),
      Invoice.find({}).sort({ createdAt: -1 }),
      Product.find({}),
      ClassModel.find({}),
      User.find({}),
      Setting.findOne({ key: 'gym_settings' })
    ]);

    res.json({
      success: true,
      connected: true,
      members,
      plans,
      trainers,
      attendance,
      invoices,
      products,
      classes,
      users,
      settings: setting || {
        gymName: 'TITAN IRON GYM',
        tagline: 'PREMIER GYM MEMBERSHIP MANAGEMENT SYSTEM',
        currency: '₹',
        upiId: 'titanirongym@okaxis',
        phone: '+91 98400 12345',
        address: 'Plot 42, Anna Salai, Chennai, Tamil Nadu 600002'
      }
    });
  } catch (err) {
    console.error('Error in /api/init:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
