const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  user:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date:         { type: String, required: true }, // Format: YYYY-MM-DD
  loginTime:    { type: Date },
  logoutTime:   { type: Date },
  duration:     { type: Number, default: 0 },     // seconds mein
  status:       { type: String, enum: ['present', 'absent'], default: 'present' },
  pagesVisited: [{ type: String }],
}, { timestamps: true });

// Ek user ek din mein ek hi record
attendanceSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);