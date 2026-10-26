const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Member = require('../models/Member');
const Plan = require('../models/Plan');

// GET all attendance logs
router.get('/', async (req, res) => {
  try {
    const logs = await Attendance.find({}).sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST smart check-in / check-out
router.post('/checkin', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ success: false, message: 'Check-in query required' });
    }

    const q = query.trim().toLowerCase();
    const cleanDigits = query.replace(/[^0-9]/g, '');

    // Search members in MongoDB
    const members = await Member.find({});
    const member = members.find(m => 
      m.id.toLowerCase() === q || 
      (m.instagram && m.instagram.toLowerCase().includes(q)) ||
      (cleanDigits.length >= 4 && m.phone.replace(/[^0-9]/g, '').includes(cleanDigits)) || 
      m.email.toLowerCase() === q ||
      m.fullName.toLowerCase().includes(q)
    );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found in MongoDB. Check ID, Name, Instagram (@handle) or Phone number.'
      });
    }

    // Check expiration
    const today = new Date().toISOString().split('T')[0];
    const expDate = new Date(member.expiryDate);
    const now = new Date(today);
    const diffDays = Math.ceil((expDate - now) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return res.status(403).json({
        success: false,
        message: `Access Denied: ${member.fullName}'s membership expired on ${member.expiryDate}. Renewal required!`,
        member
      });
    }

    // Check if member already has active ongoing session today
    const ongoing = await Attendance.findOne({
      memberId: member.id,
      date: today,
      checkOutTime: { $regex: /Active/i }
    });

    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (ongoing) {
      ongoing.checkOutTime = nowTime;
      ongoing.status = 'Completed';
      await ongoing.save();

      return res.json({
        success: true,
        message: `${member.fullName} checked out at ${nowTime}. Great workout!`,
        type: 'checkout',
        member,
        log: ongoing
      });
    }

    // New check-in
    const plan = await Plan.findOne({ id: member.planId });
    const count = await Attendance.countDocuments();
    const newLog = new Attendance({
      id: `ATT-${Date.now().toString().slice(-4)}-${count + 1}`,
      memberId: member.id,
      memberName: member.fullName,
      planName: plan ? plan.name : 'Gym Member',
      checkInTime: nowTime,
      checkOutTime: 'Active (On Floor)',
      date: today,
      status: 'In Gym'
    });
    await newLog.save();

    res.json({
      success: true,
      message: `Welcome, ${member.fullName}! Verified & Checked in at ${nowTime} (MongoDB Saved).`,
      type: 'checkin',
      member,
      log: newLog
    });
  } catch (err) {
    console.error('Checkin error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
