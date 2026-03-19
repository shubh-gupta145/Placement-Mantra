const mongoose = require('mongoose');

const featureUsageSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  feature:   { 
    type: String, 
    // ⚠️ EDIT KARO — apni website ke features ke naam daalo
    enum: [
      'mock-interview',
      'english-lab',
      'cgpa-page',
      'roadmap',
      'free-resources',
      'internship',
      'placement-calendar',
      'it-news',
      'about-us',
      'test-page'
    ],
    required: true 
  },
  visitedAt:  { type: Date, default: Date.now },
  duration:   { type: Number, default: 0 }, // us feature pe kitne seconds raha
  sessionId:  { type: String },
}, { timestamps: true });

module.exports = mongoose.model('FeatureUsage', featureUsageSchema);