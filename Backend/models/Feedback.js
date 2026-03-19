const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({

  // ── Aapka existing code ──
  message: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },

  // ── Admin Panel ke liye naye fields ──
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },

  userName: { 
    type: String, 
    default: 'Anonymous' 
  },

  feature: { 
    type: String, 
    default: 'general'
    // Mock Interview, Roadmap, English Lab etc.
  },

  rating: { 
    type: Number, 
    min: 1, 
    max: 5 
  },

  // Auto set hoga rating ke hisab se
  sentiment: { 
    type: String, 
    enum: ['positive', 'neutral', 'negative'], 
    default: 'neutral' 
  },

  // Admin resolve kar sakta hai feedback ko
  isResolved: { 
    type: Boolean, 
    default: false 
  },

});

// ── Rating ke hisab se sentiment automatically set hoga ──
// 4-5 star = positive
// 3 star   = neutral  
// 1-2 star = negative
feedbackSchema.pre('save', function(next) {
  if (this.rating >= 4)       this.sentiment = 'positive';
  else if (this.rating === 3) this.sentiment = 'neutral';
  else if (this.rating)       this.sentiment = 'negative';
  // agar rating nahi di toh neutral rahega
  next();
});

module.exports = mongoose.model("Feedback", feedbackSchema);