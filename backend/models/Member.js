const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  instagram: { type: String, default: '' },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, default: 'Male' },
  location: { type: String, default: 'Chennai, Tamil Nadu' },
  dob: { type: String, default: '' },
  planId: { type: String, required: true },
  durationCycle: { type: String, default: 'monthly' },
  trainerId: { type: String, default: '' },
  joinDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  expiryDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  status: { type: String, default: 'Active' },
  emergencyContact: { type: String, default: '' },
  notes: { type: String, default: '' },
  avatar: { type: String, default: '' },
  dpImage: { type: String, default: '' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Member', memberSchema);
