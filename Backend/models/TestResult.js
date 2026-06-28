const mongoose = require("mongoose");

const TestResultSchema = new mongoose.Schema({
  email: { type: String, required: true },

  // "programming" | "english-lab" | "mock-interview"
  featureType: { type: String, required: true },

  // Programming Test fields
  topic:      { type: String },
  difficulty: { type: String },
  correct:    { type: Number },
  wrong:      { type: Number },
  percentage: { type: Number },

  // English Speaking Lab fields
  category:  { type: String },   // hr / tech / conv / gd
  totalQ:    { type: Number },
  avgScore:  { type: Number },
  scores:    [Number],

  // Mock Interview fields
  role:        { type: String },
  timing:      { type: Number },
  reason:      { type: String }, // completed / stopped / timeout
  qaLog:       [{ question: String, answer: String }],
  resumeBased: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TestResult", TestResultSchema);