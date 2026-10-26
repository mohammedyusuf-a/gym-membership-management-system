const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { isDBConnected } = require('../config/db');
const Member = require('../models/Member');
const User = require('../models/User');
const Plan = require('../models/Plan');
const Trainer = require('../models/Trainer');
const Attendance = require('../models/Attendance');
const Invoice = require('../models/Invoice');
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const connected = isDBConnected();
  let counts = {};
  if (connected) {
    try {
      counts = {
        members: await Member.countDocuments(),
        users: await User.countDocuments(),
        plans: await Plan.countDocuments(),
        trainers: await Trainer.countDocuments(),
        attendance: await Attendance.countDocuments(),
        invoices: await Invoice.countDocuments(),
        products: await Product.countDocuments(),
      };
    } catch (e) {
      console.error('Error fetching collection counts', e);
    }
  }

  res.json({
    status: 'ok',
    connected: connected,
    dbState: mongoose.connection.readyState, // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    host: mongoose.connection.host || '127.0.0.1',
    port: mongoose.connection.port || 27017,
    database: mongoose.connection.name || 'gym_management',
    serverTime: new Date().toISOString(),
    counts
  });
});

module.exports = router;
