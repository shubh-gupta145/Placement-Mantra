const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

  // ── Admin Panel fields ──
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

// ── Password save hone se pehle automatically hash hoga ──
userSchema.pre('save', async function(next) {
  // Sirf tab hash karo jab password change hua ho
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ── Login ke waqt password compare karne ke liye ──
userSchema.methods.comparePassword = async function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model("User", userSchema);