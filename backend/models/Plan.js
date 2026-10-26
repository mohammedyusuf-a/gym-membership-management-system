const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  monthlyPrice: { type: Number, required: true },
  yearlyPrice: { type: Number, required: true },
  tag: { type: String, default: '' },
  features: [{ type: String }],
  activeMembers: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);
