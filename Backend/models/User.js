const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({

  // ── Basic Info ──
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

  // ── Phone + OTP ──
  phone: {
    type: String,
    unique: true,
    sparse: true,        // null allowed — unique sirf non-null pe apply hoga
  },

  isPhoneVerified: {
    type: Boolean,
    default: false
  },

  // ── Trial + Premium ──
  trialStart: {
    type: Date,
    default: Date.now    // account bante hi 30 day trial shuru
  },

  isPremium: {
    type: Boolean,
    default: false
  },

  premiumExpiry: {
    type: Date,
    default: null        // subscription khatam hone ki date
  },

  // ── Reset Password ──
  resetToken: {
    type: String,
    default: null
  },

  resetTokenExpiry: {
    type: Date,
    default: null
  },

  // ── Admin Panel ──
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

// ── Password save hone se pehle hash ──
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ── Password compare ──
userSchema.methods.comparePassword = async function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

// ── Trial active hai ya nahi check karo ──
userSchema.methods.isTrialActive = function() {
  const trialEnd = new Date(this.trialStart);
  trialEnd.setDate(trialEnd.getDate() + 30);
  return new Date() < trialEnd;
};

// ── Premium ya trial access hai check karo ──
userSchema.methods.hasAccess = function() {
  if (this.isPremium) {
    // Premium expiry check
    if (this.premiumExpiry && new Date() > this.premiumExpiry) {
      return false;
    }
    return true;
  }
  return this.isTrialActive();
};

module.exports = mongoose.model("User", userSchema);