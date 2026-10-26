const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  title: { type: String, default: '' },
  specialty: { type: String, default: '' },
  experience: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  location: { type: String, default: 'Chennai, Tamil Nadu' },
  avatar: { type: String, default: '' },
  activeClients: { type: Number, default: 0 },
  status: { type: String, default: 'Active' },
  instagram: { type: String, default: '' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Trainer', trainerSchema);
