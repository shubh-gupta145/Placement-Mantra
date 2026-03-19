const router = require('express').Router();
const FeatureUsage = require('../models/FeatureUsage');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

// ─────────────────────────────────────
// POST /api/analytics/track-feature
// Jab bhi user koi feature visit kare — ye call karo
// ─────────────────────────────────────
router.post('/track-feature', protect, async (req, res) => {
  try {
    const { feature, duration, sessionId } = req.body;

    await FeatureUsage.create({ 
      user: req.user._id, 
      feature, 
      duration, 
      sessionId 
    });

    res.json({ message: 'Feature tracked' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────
// GET /api/analytics/features
// Kaun sa feature kitna use hua — chart data
// ─────────────────────────────────────
router.get('/features', protect, adminOnly, async (req, res) => {
  try {
    const data = await FeatureUsage.aggregate([
      { 
        $group: {
          _id:         '$feature',
          visits:      { $sum: 1 },
          totalTime:   { $sum: '$duration' },
          uniqueUsers: { $addToSet: '$user' }
        }
      },
      { 
        $project: {
          feature:     '$_id',
          visits:      1,
          totalTime:   1,
          uniqueUsers: { $size: '$uniqueUsers' }
        }
      },
      { $sort: { visits: -1 } }
    ]);

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────
// GET /api/analytics/user-time
// Har user ne kitna time site pe bitaya
// ─────────────────────────────────────
router.get('/user-time', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({ role: 'student' })
      .select('name email department totalVisitTime visitCount lastSeen')
      .sort('-totalVisitTime')
      .limit(20);

    res.json(users);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────
// GET /api/analytics/overview
// Dashboard ke liye sabka summary
// ─────────────────────────────────────
router.get('/overview', protect, adminOnly, async (req, res) => {
  try {
    const totalUsers        = await User.countDocuments({ role: 'student' });
    const blockedUsers      = await User.countDocuments({ role: 'student', isBlocked: true });
    const totalFeatureVisits= await FeatureUsage.countDocuments();

    // Top feature kaun sa hai
    const topFeatureArr = await FeatureUsage.aggregate([
      { $group: { _id: '$feature', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    // Aaj kitne active hain
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const activeTodayArr = await FeatureUsage.distinct('user', { 
      visitedAt: { $gte: today } 
    });

    res.json({
      totalUsers,
      blockedUsers,
      activeUsers:         totalUsers - blockedUsers,
      totalFeatureVisits,
      topFeature:          topFeatureArr[0]?._id || 'N/A',
      activeToday:         activeTodayArr.length
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;