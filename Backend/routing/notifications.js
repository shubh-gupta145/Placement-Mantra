const router = require('express').Router();
const Notification = require('../models/Notification');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');
const nodemailer = require('nodemailer');

// ─────────────────────────────────────
// Gmail setup
// ─────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ─────────────────────────────────────
// Email bhejne ka function
// ─────────────────────────────────────
async function sendEmailToUsers(users, title, message) {
  const emailList = users.map(u => u.email).join(',');

  await transporter.sendMail({
    from: `"Placement Mantra" <${process.env.EMAIL_USER}>`,
    to: emailList,
    subject: `🎯 ${title}`,
    html: `
      <div style="font-family:sans-serif; max-width:600px; margin:auto;">
        <div style="background:#f97316; padding:20px; border-radius:10px 10px 0 0;">
          <h2 style="color:#fff; margin:0;">🎯 Placement Mantra</h2>
        </div>
        <div style="background:#f9fafb; padding:24px; border-radius:0 0 10px 10px;">
          <h3 style="color:#111;">${title}</h3>
          <p style="color:#374151; line-height:1.6;">${message}</p>
          <a href="${process.env.WEBSITE_URL || 'http://localhost:3000'}"
             style="background:#f97316; color:#fff; padding:10px 20px;
                    border-radius:6px; text-decoration:none;
                    display:inline-block; margin-top:12px;">
            Visit Placement Mantra
          </a>
        </div>
      </div>
    `
  });
}

// ─────────────────────────────────────
// POST /api/notifications/send
// Admin: notification bhejo
// ─────────────────────────────────────
router.post('/send', protect, adminOnly, async (req, res) => {
  try {
    const { title, message, type, frequency, sentTo, recipientIds } = req.body;

    let users;
    if (sentTo === 'specific' && recipientIds?.length) {
      users = await User.find({
        _id: { $in: recipientIds },
        isBlocked: false
      });
    } else {
      users = await User.find({
        role: 'student',
        isBlocked: false
      });
    }

    const notif = await Notification.create({
      title,
      message,
      type,
      frequency,
      sentTo,
      recipients: users.map(u => u._id),
      createdBy: req.user._id
    });

    // Email async bhejo
    sendEmailToUsers(users, title, message).catch(err => {
      console.error('Email sending failed:', err.message);
    });

    res.status(201).json({
      message: `Notification sent to ${users.length} students`,
      notif
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────
// GET /api/notifications/stats
// Admin: total + this week count
// ─────────────────────────────────────
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const total = await Notification.countDocuments();

    const thisWeek = await Notification.countDocuments({
      createdAt: {
        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      }
    });

    res.json({ total, thisWeek });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────
// GET /api/notifications/user
// Student: apni notifications dekho
// ─────────────────────────────────────
router.get('/user', protect, async (req, res) => {
  try {
    const notifs = await Notification.find({
      $or: [
        { sentTo: 'all' },
        { recipients: req.user._id }
      ]
    })
    .sort('-createdAt')
    .limit(20);

    res.json(notifs);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────
// GET /api/notifications
// Admin: saari notifications ki list
// ─────────────────────────────────────
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const notifs = await Notification.find()
      .populate('createdBy', 'name')
      .sort('-createdAt')
      .limit(50);

    res.json(notifs);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;