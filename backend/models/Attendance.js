const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  memberId: { type: String, required: true },
  memberName: { type: String, required: true },
  planName: { type: String, default: 'Gym Member' },
  checkInTime: { type: String, required: true },
  checkOutTime: { type: String, default: 'Active (On Floor)' },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] },
  status: { type: String, default: 'In Gym' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Attendance', attendanceSchema);
