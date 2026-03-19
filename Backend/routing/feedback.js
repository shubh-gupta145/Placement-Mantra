const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");
const { protect, adminOnly } = require('../middleware/auth');


// ─────────────────────────────────────
// POST /feedback — Aapka existing route
// Student feedback submit kare
// ─────────────────────────────────────
router.post("/feedback", async (req, res) => {
  try {

    const newFeedback = new Feedback({
      // ── Aapka existing code ──
      message: req.body.message,

      // ── Admin Panel ke liye naye fields ──
      // Agar user logged in hai toh uski info bhi save karo
      user:     req.body.userId   || null,
      userName: req.body.userName || 'Anonymous',
      feature:  req.body.feature  || 'general',
      rating:   req.body.rating   || null,
    });

    await newFeedback.save();

    // ── Aapka existing response ──
    res.status(201).json({
      success: true,
      message: "Feedback saved"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


// ─────────────────────────────────────
// POST /api/feedback — Admin Panel route
// Logged in user ka feedback (token se user pata chalta hai)
// ─────────────────────────────────────
router.post('/api/feedback', protect, async (req, res) => {
  try {
    const { feature, rating, message } = req.body;

    const fb = new Feedback({
      user:     req.user._id,
      userName: req.user.name,
      feature,
      rating,
      message
    });

    await fb.save();

    res.status(201).json({
      success: true,
      message: "Feedback saved",
      data: fb
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


// ─────────────────────────────────────
// GET /api/feedback — Admin: saare feedbacks dekho
// Filter by sentiment ya feature
// ─────────────────────────────────────
router.get('/api/feedback', protect, adminOnly, async (req, res) => {
  try {
    const { sentiment, feature } = req.query;

    let query = {};
    if (sentiment) query.sentiment = sentiment;
    if (feature)   query.feature   = feature;

    const feedbacks = await Feedback.find(query)
      .populate('user', 'name email')
      .sort('-createdAt');

    res.json({
      success: true,
      count: feedbacks.length,
      data: feedbacks
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


// ─────────────────────────────────────
// GET /api/feedback/analysis
// Admin: sentiment + rating + feature breakdown
// Charts ke liye data
// ─────────────────────────────────────
router.get('/api/feedback/analysis', protect, adminOnly, async (req, res) => {
  try {

    // Positive / Neutral / Negative count
    const sentimentCounts = await Feedback.aggregate([
      {
        $group: {
          _id:       '$sentiment',
          count:     { $sum: 1 },
          avgRating: { $avg: '$rating' }
        }
      }
    ]);

    // Har feature ka breakdown
    const featureBreakdown = await Feedback.aggregate([
      {
        $group: {
          _id:       '$feature',
          total:     { $sum: 1 },
          avgRating: { $avg: '$rating' },
          positive:  { $sum: { $cond: [{ $eq: ['$sentiment', 'positive'] }, 1, 0] } },
          negative:  { $sum: { $cond: [{ $eq: ['$sentiment', 'negative'] }, 1, 0] } },
          neutral:   { $sum: { $cond: [{ $eq: ['$sentiment', 'neutral']  }, 1, 0] } },
        }
      },
      { $sort: { total: -1 } }
    ]);

    // 1 star se 5 star distribution
    const ratingDistribution = await Feedback.aggregate([
      { $group: { _id: '$rating', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const total = await Feedback.countDocuments();

    res.json({
      success: true,
      data: {
        sentimentCounts,
        featureBreakdown,
        ratingDistribution,
        total
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


// ─────────────────────────────────────
// PATCH /api/feedback/:id/resolve
// Admin feedback ko resolve mark kare
// ─────────────────────────────────────
router.patch('/api/feedback/:id/resolve', protect, adminOnly, async (req, res) => {
  try {
    const fb = await Feedback.findByIdAndUpdate(
      req.params.id,
      { isResolved: true },
      { new: true }
    );

    if (!fb) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found"
      });
    }

    res.json({
      success: true,
      message: "Feedback resolved",
      data: fb
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


module.exports = router;