const router = require('express').Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// ─────────────────────────────────────
// POST /api/track/heartbeat
// Frontend har 30 seconds mein ye call karta hai
// Isse pata chalta hai user kitna time site pe hai
// ─────────────────────────────────────
router.post('/heartbeat', protect, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { totalVisitTime: 30 }, // 30 seconds add karo
      lastSeen: new Date()
    });

    res.json({ ok: true });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;