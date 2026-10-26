const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const Plan = require('../models/Plan');
const Invoice = require('../models/Invoice');

// Helper to compute dynamic status
const computeMemberStatus = (m) => {
  const today = new Date().toISOString().split('T')[0];
  const expDate = new Date(m.expiryDate);
  const now = new Date(today);
  const diffDays = Math.ceil((expDate - now) / (1000 * 60 * 60 * 24));

  let computedStatus = m.status;
  if (diffDays < 0) {
    computedStatus = 'Expired';
  } else if (diffDays <= 7) {
    computedStatus = 'Expiring Soon';
  } else {
    computedStatus = 'Active';
  }
  const obj = m.toObject ? m.toObject() : { ...m };
  return { ...obj, status: computedStatus, daysLeft: diffDays };
};

// GET all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find({}).sort({ createdAt: -1 });
    res.json(members.map(computeMemberStatus));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single member
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findOne({ id: req.params.id });
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(computeMemberStatus(member));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add new member
router.post('/', async (req, res) => {
  try {
    const memberData = req.body;
    let newId = memberData.id;
    if (!newId) {
      const count = await Member.countDocuments();
      newId = `GYM-${1000 + count + 1}`;
    }

    const plan = await Plan.findOne({ id: memberData.planId });
    const cycle = memberData.durationCycle || 'monthly';
    const addDays = cycle === 'yearly' ? 365 : 30;

    let join = memberData.joinDate || new Date().toISOString().split('T')[0];
    let expiry = memberData.expiryDate;
    if (!expiry) {
      const d = new Date(join);
      d.setDate(d.getDate() + addDays);
      expiry = d.toISOString().split('T')[0];
    }

    const cleanInstagram = memberData.instagram || `@${(memberData.fullName || 'athlete').toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

    const newMember = new Member({
      id: newId,
      fullName: memberData.fullName,
      instagram: cleanInstagram,
      email: memberData.email,
      phone: memberData.phone,
      gender: memberData.gender || 'Male',
      location: memberData.location || 'Chennai, Tamil Nadu',
      dob: memberData.dob || '',
      planId: memberData.planId,
      durationCycle: cycle,
      trainerId: memberData.trainerId || '',
      joinDate: join,
      expiryDate: expiry,
      status: 'Active',
      emergencyContact: memberData.emergencyContact || '',
      notes: memberData.notes || 'Enrolled in Gym Management System',
      avatar: memberData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(memberData.fullName)}&background=18181b&color=ffffff&bold=true`,
      dpImage: memberData.dpImage || ''
    });

    await newMember.save();

    // Auto-create initial invoice
    let amount = 500;
    if (plan) {
      amount = cycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
    }
    const invCount = await Invoice.countDocuments();
    const newInvoice = new Invoice({
      id: `INV-2026-${String(invCount + 101).padStart(3, '0')}`,
      memberId: newId,
      memberName: newMember.fullName,
      planName: `${plan ? plan.name : 'Gym Plan'} (${cycle === 'yearly' ? 'Yearly Package' : 'Monthly Subscription'})`,
      amount: amount,
      paymentMethod: memberData.paymentMethod || 'UPI (Google Pay)',
      date: join,
      status: 'Paid',
      reference: `ENR-${Date.now().toString().slice(-6)}`
    });
    await newInvoice.save();

    res.status(201).json({
      success: true,
      member: computeMemberStatus(newMember),
      invoice: newInvoice
    });
  } catch (err) {
    console.error('Error adding member:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT update member
router.put('/:id', async (req, res) => {
  try {
    const updated = await Member.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Member not found' });
    res.json({ success: true, member: computeMemberStatus(updated) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE member
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Member.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ error: 'Member not found' });
    res.json({ success: true, message: 'Member deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST renew membership
router.post('/:id/renew', async (req, res) => {
  try {
    const member = await Member.findOne({ id: req.params.id });
    if (!member) return res.status(404).json({ error: 'Member not found' });

    const cycle = req.body.cycle || 'monthly';
    const paymentMethod = req.body.paymentMethod || 'UPI (Google Pay)';

    const currentExp = new Date(member.expiryDate);
    const today = new Date();
    const baseDate = currentExp > today ? currentExp : today;
    const monthsToAdd = cycle === 'yearly' ? 12 : 1;
    baseDate.setMonth(baseDate.getMonth() + monthsToAdd);

    member.expiryDate = baseDate.toISOString().split('T')[0];
    member.durationCycle = cycle;
    member.status = 'Active';
    await member.save();

    const plan = await Plan.findOne({ id: member.planId });
    let amount = 500;
    if (plan) {
      amount = cycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
    }

    const invCount = await Invoice.countDocuments();
    const invoice = new Invoice({
      id: `INV-2026-${String(invCount + 101).padStart(3, '0')}`,
      memberId: member.id,
      memberName: member.fullName,
      planName: `${plan ? plan.name : 'Gym Plan'} (${cycle === 'yearly' ? '1 Year Extension' : '1 Month Extension'})`,
      amount: amount,
      paymentMethod: paymentMethod,
      date: new Date().toISOString().split('T')[0],
      status: 'Paid',
      reference: `RNW-${Date.now().toString().slice(-6)}`
    });
    await invoice.save();

    res.json({
      success: true,
      member: computeMemberStatus(member),
      invoice
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST apply membership plan (instant / checkout)
router.post('/apply-plan', async (req, res) => {
  try {
    const { memberId, planId, cycle = 'monthly', paymentMethod = 'UPI (Google Pay)', reference = '' } = req.body;
    const plan = await Plan.findOne({ id: planId });
    if (!plan) return res.status(404).json({ success: false, message: 'Membership plan not found.' });

    let member = await Member.findOne({ id: memberId });
    if (!member) {
      const count = await Member.countDocuments();
      member = new Member({
        id: `GYM-${1000 + count + 1}`,
        fullName: 'Counter Walk-in Athlete',
        instagram: '@tamil_fitness_athlete',
        email: 'athlete@titanfitness.in',
        phone: '+91 98401 55667',
        gender: 'Male',
        location: 'Chennai, Tamil Nadu',
        dob: '1998-01-01',
        planId: planId,
        durationCycle: cycle,
        trainerId: 'TR-101',
        joinDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date().toISOString().split('T')[0],
        status: 'Active',
        notes: 'Enrolled via instant UPI checkout',
        avatar: `https://ui-avatars.com/api/?name=Walkin+Athlete&background=18181b&color=ffffff&bold=true`
      });
    }

    const price = cycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
    const addDays = cycle === 'yearly' ? 365 : 30;

    let baseDate = new Date();
    const currentExp = new Date(member.expiryDate);
    if (currentExp > baseDate) {
      baseDate = currentExp;
    }
    baseDate.setDate(baseDate.getDate() + addDays);
    const newExpiry = baseDate.toISOString().split('T')[0];

    member.planId = planId;
    member.durationCycle = cycle;
    member.expiryDate = newExpiry;
    member.status = 'Active';
    await member.save();

    const invCount = await Invoice.countDocuments();
    const invoice = new Invoice({
      id: `INV-2026-${String(invCount + 101).padStart(3, '0')}`,
      memberId: member.id,
      memberName: member.fullName,
      planName: `${plan.name} (${cycle === 'yearly' ? 'Yearly Package' : 'Monthly Subscription'})`,
      amount: price,
      paymentMethod: paymentMethod,
      date: new Date().toISOString().split('T')[0],
      status: 'Paid',
      reference: reference || `UPI-${Date.now().toString().slice(-6)}`
    });
    await invoice.save();

    res.json({
      success: true,
      message: `Successfully applied ${plan.name} (${cycle.toUpperCase()}) for ${member.fullName}! Valid till ${newExpiry}.`,
      member: computeMemberStatus(member),
      invoice
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
