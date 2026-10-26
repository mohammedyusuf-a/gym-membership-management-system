const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login user/admin
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    // Check MongoDB Users
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${cleanEmail}$`, 'i') }
    });

    if (user && user.password === cleanPass) {
      return res.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          dpImage: user.dpImage || '',
          phone: user.phone || ''
        }
      });
    }

    // Default admin fallback if collection not initialized
    if (cleanEmail === 'titan@gmail.com' && cleanPass === 'titan123') {
      return res.json({
        success: true,
        user: {
          id: 'USR-ADMIN',
          name: 'Titan Admin Master',
          email: 'titan@gmail.com',
          role: 'Administrator',
          avatar: 'AD',
          dpImage: '',
          phone: '+91 98401 22334'
        }
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid credentials. Please verify your email and password.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, role = 'Gym Member', password } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = await User.findOne({
      email: { $regex: new RegExp(`^${cleanEmail}$`, 'i') }
    });

    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already registered. Try logging in.' });
    }

    const count = await User.countDocuments();
    const initials = name.trim().split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'TG';
    const newUser = new User({
      id: `USR-${Date.now().toString().slice(-4)}-${count + 1}`,
      name: name.trim(),
      email: cleanEmail,
      phone: phone || '',
      password: password.trim(),
      role: role,
      avatar: initials,
      dpImage: '',
      fitnessGoal: 'Hypertrophy & General Fitness',
      experience: 'Beginner',
      planName: 'Standard Fitness',
      termsAccepted: true
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'Account registered successfully in MongoDB!',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar,
        dpImage: newUser.dpImage,
        phone: newUser.phone
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET user profile
router.get('/profile/:emailOrId', async (req, res) => {
  try {
    const identifier = req.params.emailOrId.trim();
    let user = await User.findOne({
      $or: [
        { id: identifier },
        { email: { $regex: new RegExp(`^${identifier}$`, 'i') } }
      ]
    }).select('-password');

    if (!user) {
      user = await User.findOne({ id: 'USR-YUSUF' }).select('-password');
    }
    if (!user) {
      user = await User.findOne({}).select('-password');
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update user profile
router.put('/profile/:emailOrId', async (req, res) => {
  try {
    const identifier = req.params.emailOrId.trim();
    const updateData = { ...req.body };
    delete updateData.password; // Do not overwrite password via profile update

    const updated = await User.findOneAndUpdate(
      {
        $or: [
          { id: identifier },
          { email: { $regex: new RegExp(`^${identifier}$`, 'i') } }
        ]
      },
      { $set: updateData },
      { new: true }
    ).select('-password');

    if (!updated) {
      return res.status(404).json({ success: false, message: 'User not found in MongoDB' });
    }

    res.json({ success: true, user: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
