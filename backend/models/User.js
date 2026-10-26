const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: '' },
  password: { type: String, required: true },
  role: { type: String, default: 'Gym Member' },
  avatar: { type: String, default: 'US' },
  dpImage: { type: String, default: '' },
  dob: { type: String, default: '' },
  height: { type: String, default: '' },
  weight: { type: String, default: '' },
  targetWeight: { type: String, default: '' },
  bodyFat: { type: String, default: '' },
  fitnessGoal: { type: String, default: 'General Fitness' },
  experience: { type: String, default: 'Beginner' },
  trainer: { type: String, default: '' },
  planName: { type: String, default: 'Standard Fitness' },
  planExpiry: { type: String, default: '' },
  emergencyContact: { type: String, default: '' },
  address: { type: String, default: '' },
  termsAccepted: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
