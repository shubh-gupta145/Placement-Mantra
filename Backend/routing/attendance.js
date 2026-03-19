const router = require('express').Router();
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

// ─────────────────────────────────────
// POST /api/attendance/checkin
// User login kare toh ye call karo
// ─────────────────────────────────────
router.post('/checkin', protect, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // Aaj ka record pehle se hai?
    let record = await Attendance.findOne({ 
      user: req.user._id, 
      date: today 
    });

    // Nahi hai toh banao
    if (!record) {
      record = await Attendance.create({ 
        user: req.user._id, 
        date: today, 
        loginTime: new Date(), 
        status: 'present' 
      });
    }

    res.json(record);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────
// POST /api/attendance/checkout
// User logout kare toh ye call karo
// ─────────────────────────────────────
router.post('/checkout', protect, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const record = await Attendance.findOne({ 
      user: req.user._id, 
      date: today 
    });

    if (record) {
      // Kitna time laga calculate karo
      const duration = Math.round(
        (Date.now() - new Date(record.loginTime).getTime()) / 1000
      );

      record.logoutTime = new Date();
      record.duration   = duration;
      await record.save();

      // User ke total time mein add karo
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { 
          totalVisitTime: duration, 
          visitCount: 1 
        },
        lastSeen: new Date()
      });
    }

    res.json({ message: 'Checkout recorded successfully' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────
// GET /api/attendance/summary
// Admin: har student ki attendance summary
// ─────────────────────────────────────
router.get('/summary', protect, adminOnly, async (req, res) => {
  try {
    const { period = 'month' } = req.query;

    // Period ke hisab se start date set karo
    let startDate = new Date();
    if (period === 'week')       startDate.setDate(startDate.getDate() - 7);
    else if (period === 'month') startDate.setMonth(startDate.getMonth() - 1);
    else                         startDate.setFullYear(startDate.getFullYear() - 1);

    const summary = await Attendance.aggregate([
      { 
        $match: { 
          date: { $gte: startDate.toISOString().split('T')[0] } 
        } 
      },
      { 
        $group: {
          _id: '$user',
          totalDays:     { $sum: 1 },
          totalDuration: { $sum: '$duration' },
          avgDuration:   { $avg: '$duration' }
        }
      },
      { 
        $lookup: { 
          from: 'users', 
          localField: '_id', 
          foreignField: '_id', 
          as: 'user' 
        } 
      },
      { $unwind: '$user' },
      { 
        $project: {
          name:          '$user.name',
          email:         '$user.email',
          department:    '$user.department',
          totalDays:     1,
          totalDuration: 1,
          avgDuration:   1
        }
      },
      { $sort: { totalDays: -1 } }
    ]);

    res.json(summary);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────
// GET /api/attendance/daily
// Chart ke liye daily counts
// ─────────────────────────────────────
router.get('/daily', protect, adminOnly, async (req, res) => {
  try {
    const days  = parseInt(req.query.days) || 30;
    const start = new Date();
    start.setDate(start.getDate() - days);

    const data = await Attendance.aggregate([
      { 
        $match: { 
          date:   { $gte: start.toISOString().split('T')[0] },
          status: 'present'
        } 
      },
      { 
        $group: { 
          _id:   '$date', 
          count: { $sum: 1 } 
        } 
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;