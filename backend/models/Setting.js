const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  key: { type: String, default: 'gym_settings', unique: true },
  gymName: { type: String, default: 'TITAN IRON GYM' },
  tagline: { type: String, default: 'PREMIER GYM MEMBERSHIP MANAGEMENT SYSTEM' },
  currency: { type: String, default: '₹' },
  upiId: { type: String, default: 'titanirongym@okaxis' },
  phone: { type: String, default: '+91 98400 12345' },
  address: { type: String, default: 'Plot 42, Anna Salai, Chennai, Tamil Nadu 600002' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Setting', settingSchema);
