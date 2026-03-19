const router = require('express').Router();
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

// ─────────────────────────────────────
// GET /api/users — Saare students ki list
// ─────────────────────────────────────
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { search, blocked } = req.query;

    let query = { role: 'student' };

    // Search by name ya email
    if (search) {
      query.$or = [
        { name:  { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Sirf blocked users dikhao
    if (blocked === 'true') query.isBlocked = true;

    const users = await User.find(query)
      .select('-password')
      .sort('-createdAt');

    res.json(users);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────
// GET /api/users/stats — Dashboard ke liye counts
// ─────────────────────────────────────
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const total   = await User.countDocuments({ role: 'student' });
    const blocked = await User.countDocuments({ role: 'student', isBlocked: true });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newToday = await User.countDocuments({ 
      role: 'student', 
      createdAt: { $gte: today } 
    });

    res.json({ 
      total, 
      blocked, 
      active: total - blocked, 
      newToday 
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────
// PATCH /api/users/:id/block — User ko block karo
// ─────────────────────────────────────
router.patch('/:id/block', protect, adminOnly, async (req, res) => {
  try {
    const { reason } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        isBlocked: true, 
        blockReason: reason || 'Blocked by admin' 
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User blocked successfully', user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────
// PATCH /api/users/:id/unblock — User ko unblock karo
// ─────────────────────────────────────
router.patch('/:id/unblock', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        isBlocked: false, 
        blockReason: '' 
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User unblocked successfully', user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;