const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  memberId: { type: String, default: '' },
  memberName: { type: String, required: true },
  planName: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, default: 'UPI (Google Pay)' },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] },
  status: { type: String, default: 'Paid' },
  reference: { type: String, default: '' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Invoice', invoiceSchema);
