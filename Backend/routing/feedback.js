const express = require("express");
const router  = express.Router();
const Feedback = require("../models/Feedback");
const { protect, adminOnly } = require('../middleware/auth');

// ─────────────────────────────────────
// POST /api/feedback
// Student feedback submit kare
// ─────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const newFeedback = new Feedback({
      message:  req.body.message,
      user:     req.body.userId   || null,
      userName: req.body.userName || 'Anonymous',
      feature:  req.body.feature  || 'general',
      rating:   req.body.rating   || null,
    });

    await newFeedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback saved"
    });

  } catch (error) {
    console.error("Feedback Error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ─────────────────────────────────────
// GET /api/feedback/analysis
// Sentiment breakdown — Admin only
// ─────────────────────────────────────
router.get('/analysis', protect, adminOnly, async (req, res) => {
  try {
    const sentimentCounts = await Feedback.aggregate([
      {
        $group: {
          _id:       '$sentiment',
          count:     { $sum: 1 },
          avgRating: { $avg: '$rating' }
        }
      }
    ]);

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

    const ratingDistribution = await Feedback.aggregate([
      { $group: { _id: '$rating', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const total = await Feedback.countDocuments();

    res.json({
      sentimentCounts,
      featureBreakdown,
      ratingDistribution,
      total
    });

  } catch (error) {
    console.error("Analysis Error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ─────────────────────────────────────
// GET /api/feedback
// Admin: saare feedbacks
// ─────────────────────────────────────
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { sentiment, feature } = req.query;

    let query = {};
    if (sentiment) query.sentiment = sentiment;
    if (feature)   query.feature   = feature;

    const feedbacks = await Feedback.find(query)
      .populate('user', 'name email')
      .sort('-createdAt');

    res.json(feedbacks);

  } catch (error) {
    console.error("Get Feedback Error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ─────────────────────────────────────
// PATCH /api/feedback/:id/resolve
// ─────────────────────────────────────
router.patch('/:id/resolve', protect, adminOnly, async (req, res) => {
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