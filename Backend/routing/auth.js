const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ─────────────────────────────────────
// SIGN UP — Aapka existing code
// ─────────────────────────────────────
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    // Check user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({
      name,
      email,
      password: hashedPassword,
      department: department || '',  // Admin panel ke liye add kiya
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully ✅" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// ─────────────────────────────────────
// SIGN IN — Aapka existing code + admin panel features
// ─────────────────────────────────────
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    // ── Admin Panel ke liye: blocked check ──
    if (user.isBlocked) {
      return res.status(403).json({ 
        message: `Your account has been blocked. Reason: ${user.blockReason}` 
      });
    }

    // ── Admin Panel ke liye: last seen update ──
    await User.findByIdAndUpdate(user._id, { lastSeen: new Date() });

    // Create token — aapka existing code
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ── Admin Panel ke liye: role bhi bhejo ──
    res.json({ 
      token, 
      message: "Login Successful ✅",
      user: {
        id:   user._id,
        name: user.name,
        email: user.email,
        role: user.role       // 'student' ya 'admin'
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// ─────────────────────────────────────
// REGISTER — Admin Panel ka route
// (signup se alag — direct role set kar sakte ho)
// ─────────────────────────────────────
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ 
      name, 
      email, 
      password: hashedPassword,
      department: department || ''
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({ 
      token,
      user: { 
        id:    user._id, 
        name,  
        email, 
        role:  user.role 
      } 
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;