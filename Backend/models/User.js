const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  // ── Aapka existing code ──
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  // ── Reset password fields ──
  resetToken: {
    type: String,
    default: null
  },

  resetTokenExpiry: {
    type: Date,
    default: null
  },

  // ── Admin Panel ke liye ZAROORI fields ──
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },

  isBlocked: {
    type: Boolean,
    default: false
  },

  blockReason: {
    type: String,
    default: ''
  },

  department: {
    type: String,
    default: ''
  },

  lastSeen: {
    type: Date,
    default: Date.now
  },

  totalVisitTime: {
    type: Number,
    default: 0
  },

  visitCount: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);