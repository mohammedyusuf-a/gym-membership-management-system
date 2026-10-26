const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  coach: { type: String, default: '' },
  trainer: { type: String, default: '' },
  trainerAvatar: { type: String, default: '' },
  time: { type: String, required: true },
  days: { type: String, required: true },
  room: { type: String, default: 'Studio A' },
  capacity: { type: Number, default: 25 },
  enrolled: { type: Number, default: 0 },
  category: { type: String, default: 'General' },
  level: { type: String, default: 'All Levels' },
  intensity: { type: String, default: 'High' },
  tag: { type: String, default: '' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Class', classSchema);
