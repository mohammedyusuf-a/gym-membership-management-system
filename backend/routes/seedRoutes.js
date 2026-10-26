const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Member = require('../models/Member');
const User = require('../models/User');
const Plan = require('../models/Plan');
const Trainer = require('../models/Trainer');
const Attendance = require('../models/Attendance');
const Invoice = require('../models/Invoice');
const Product = require('../models/Product');
const ClassModel = require('../models/Class');
const Setting = require('../models/Setting');

const seedDatabase = async (force = false) => {
  const memberCount = await Member.countDocuments();
  if (memberCount > 0 && !force) {
    return { seeded: false, message: 'Database already contains data' };
  }

  const raw = fs.readFileSync(path.join(__dirname, '../data/initialData.json'), 'utf8');
  const data = JSON.parse(raw);

  if (force) {
    await Member.deleteMany({});
    await User.deleteMany({});
    await Plan.deleteMany({});
    await Trainer.deleteMany({});
    await Attendance.deleteMany({});
    await Invoice.deleteMany({});
    await Product.deleteMany({});
    await ClassModel.deleteMany({});
    await Setting.deleteMany({});
  }

  if (data.DEFAULT_PLANS && data.DEFAULT_PLANS.length) {
    await Plan.insertMany(data.DEFAULT_PLANS);
  }
  if (data.DEFAULT_TRAINERS && data.DEFAULT_TRAINERS.length) {
    await Trainer.insertMany(data.DEFAULT_TRAINERS);
  }
  if (data.DEFAULT_MEMBERS && data.DEFAULT_MEMBERS.length) {
    await Member.insertMany(data.DEFAULT_MEMBERS);
  }
  if (data.DEFAULT_ATTENDANCE && data.DEFAULT_ATTENDANCE.length) {
    await Attendance.insertMany(data.DEFAULT_ATTENDANCE);
  }
  if (data.DEFAULT_INVOICES && data.DEFAULT_INVOICES.length) {
    await Invoice.insertMany(data.DEFAULT_INVOICES);
  }
  if (data.DEFAULT_CLASSES && data.DEFAULT_CLASSES.length) {
    await ClassModel.insertMany(data.DEFAULT_CLASSES);
  }
  if (data.DEFAULT_PRODUCTS && data.DEFAULT_PRODUCTS.length) {
    await Product.insertMany(data.DEFAULT_PRODUCTS);
  }
  if (data.DEFAULT_USERS && data.DEFAULT_USERS.length) {
    await User.insertMany(data.DEFAULT_USERS);
  }

  const existingSetting = await Setting.findOne({ key: 'gym_settings' });
  if (!existingSetting) {
    await Setting.create({
      key: 'gym_settings',
      gymName: 'TITAN IRON GYM',
      tagline: 'PREMIER GYM MEMBERSHIP MANAGEMENT SYSTEM',
      currency: '₹',
      upiId: 'titanirongym@okaxis',
      phone: '+91 98400 12345',
      address: 'Plot 42, Anna Salai, Chennai, Tamil Nadu 600002'
    });
  }

  return {
    seeded: true,
    message: 'MongoDB successfully seeded with Tamil Fitness Influencer data!'
  };
};

router.post('/', async (req, res) => {
  try {
    const force = req.body && req.body.force === true;
    const result = await seedDatabase(force);
    res.json(result);
  } catch (err) {
    console.error('Seed error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = { router, seedDatabase };
