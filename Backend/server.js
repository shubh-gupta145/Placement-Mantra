require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Groq = require("groq-sdk");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
// ✅ express-mongo-sanitize Express 5 ke saath incompatible hai (req.query ab read-only getter hai),
//    isliye apna chhota sanitizer likha hai jo sirf req.body (mutable) clean karta hai.
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { protect } = require("./middleware/auth");

// ── Startup check: JWT_SECRET zaroori hai, missing ho to server start nahi hoga ──
if (!process.env.JWT_SECRET) {
  console.error("FATAL: JWT_SECRET .env mein set nahi hai. Server start nahi hoga.");
  process.exit(1);
}

// ── Aapki existing routes ──
const resumeRoutes = require("./routing/resumeRoutes");
const englishSpeakingRoutes = require("./routing/englishSpeaking");
const feedbackRoute = require("./routing/feedback");

// ── Admin Panel ki naye routes ──
const authRoutes = require("./routing/auth");
const userRoutes = require("./routing/users");
const notificationRoutes = require("./routing/notifications");
const attendanceRoutes = require("./routing/attendance");
const analyticsRoutes = require("./routing/analytics");
const trackingRoutes = require("./routing/tracking");

// ── Aapke existing models ──
const Profile = require("./models/ProfileUser");
const Chat = require("./models/Chat");

// ── Admin Panel ke models ──
const User = require("./models/User");

// ── Test Result model ──
const TestResult = require("./models/TestResult");

// ── Questions files ──
const dsa = require("./questions/dsaQuestions");
const web = require("./questions/webQuestions");
const aptitude = require("./questions/aptitudeQuestions");
const programming = require("./questions/programmingQuestions");

const app = express();

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

/* =========================
   MIDDLEWARE
========================= */

// ── Helmet: secure HTTP headers ──
app.use(helmet());

// ✅ cors() bina options ke sabhi origins allow karta hai — yeh risky hai production mein.
//    Allowlist se sirf apne known frontend domains allow karo.
app.use(cors({
  origin: function (origin, callback) {
    if (
      !origin ||
      origin.includes("vercel.app") ||
      origin.includes("localhost")
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ── NoSQL injection se bachne ke liye req.body sanitize karo (Express 5 safe) ──
// MongoDB operators jaise $where, $gt, $ne ya keys mein "." ko remove karta hai
function sanitizeObject(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  const clean = {};
  for (const key of Object.keys(obj)) {
    if (key.startsWith("$") || key.includes(".")) continue; // dangerous key, skip karo
    clean[key] = sanitizeObject(obj[key]);
  }
  return clean;
}

app.use((req, res, next) => {
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeObject(req.body);
  }
  next();
});

// ── General rate limiter: sabhi /api routes pe ──
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Bahut zyada requests aa gayi hain, kuch der baad try karo." }
});
app.use("/api", apiLimiter);

// ── Strict rate limiter: auth-sensitive routes (signup/signin/otp/password) ──
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Bahut zyada attempts ho gaye. 15 minute baad try karo." }
});

// ── OTP ke liye alag, thoda tight limiter (email spam se bachne ke liye) ──
const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minute
  max: 5,                    // har IP se max 5 OTP requests / 10 min
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Bahut zyada OTP requests ho gaye. Kuch der baad try karo." }
});

/* =========================
   AAPKI EXISTING ROUTES
========================= */
app.use("/api", resumeRoutes);
app.use("/api/english-speaking", englishSpeakingRoutes);

/* =========================
   TEST RESULTS ROUTES — INLINE
   ✅ Login zaroori + sirf apna data access kar sakta hai
========================= */
app.post("/api/results/save", protect, async (req, res) => {
  try {
    // ✅ email ko request body se trust nahi karte, logged-in user se lete hain
    const resultData = { ...req.body, email: req.user.email };
    const result = new TestResult(resultData);
    await result.save();
    res.json({ message: "Result saved ✅", id: result._id });
  } catch (err) {
    console.error("Save result error:", err);
    res.status(500).json({ error: "Result save nahi ho paya" });
  }
});

app.get("/api/results/:email", protect, async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);

    // ✅ sirf apna ya admin sabka data dekh sakta hai
    if (req.user.role !== "admin" && req.user.email !== email) {
      return res.status(403).json({ error: "Aap sirf apne results dekh sakte ho" });
    }

    const results = await TestResult.find({ email }).sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Results load nahi ho paye" });
  }
});

app.delete("/api/results/:id", protect, async (req, res) => {
  try {
    const result = await TestResult.findById(req.params.id);

    if (!result) {
      return res.status(404).json({ error: "Result nahi mila" });
    }

    // ✅ sirf apna result delete kar sakta hai (ya admin)
    if (req.user.role !== "admin" && req.user.email !== result.email) {
      return res.status(403).json({ error: "Aap sirf apna result delete kar sakte ho" });
    }

    await TestResult.findByIdAndDelete(req.params.id);
    res.json({ message: "Result deleted ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Result delete nahi ho paya" });
  }
});

/* =========================
   ADMIN PANEL KI NAYE ROUTES
========================= */
app.use("/api/auth",          authRoutes);
app.use("/api/users",         userRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/attendance",    attendanceRoutes);
app.use("/api/analytics",     analyticsRoutes);
app.use("/api/track",         trackingRoutes);
app.use("/api/feedback", require("./routing/feedback"));

app.get('/health', (req, res) => res.send('OK'));

/* =========================
   ENV DEBUG
========================= */
console.log("GROQ KEY:", process.env.GROQ_API_KEY ? "Loaded ✅" : "Missing ❌");

/* =========================
   GROQ SETUP
========================= */
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

/* =========================
   NODEMAILER SETUP
========================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* =========================
   EMAIL OTP STORE (in-memory)
   email -> { otp, expiry }

   ⚠️ NOTE: in-memory store sirf single-server setup ke liye theek hai.
   Agar kabhi multiple server instances (load balancer) use karoge,
   ya server restart hota rahega, to OTP store karne ke liye Redis
   ya DB collection use karna better hoga (process restart pe yeh map khali ho jaata hai).
========================= */
const otpStore = new Map();

/* =========================
   SEND OTP TO EMAIL
   ✅ Rate limited + email format validated
========================= */
app.post(
  "/send-otp",
  otpLimiter,
  [body("email").trim().isEmail().withMessage("Valid email do").normalizeEmail()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
      }

      const { email } = req.body;

      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        // ✅ generic message — yeh batane ki zaroorat nahi ki email exist karta hai
        return res.json({ message: "If eligible, an OTP has been sent." });
      }

      const otp = crypto.randomInt(100000, 999999).toString(); // ✅ crypto-safe random
      const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes

      otpStore.set(email, { otp, expiry, attempts: 0 });

      await transporter.sendMail({
        from: `"Placement Mantra" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Placement Mantra Verification Code",
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:30px;
                      border-radius:12px;background:#f9f9f9;border:1px solid #ddd;">
            <h2 style="color:#6366f1;">Verify Your Email</h2>
            <p>Your One-Time Password (OTP) is:</p>
            <div style="font-size:32px;font-weight:bold;letter-spacing:6px;
                        color:#6366f1;margin:20px 0;">
              ${otp}
            </div>
            <p style="color:#888;font-size:13px;">
              This OTP is valid for <strong>5 minutes</strong>.<br/>
              If you didn't request this, you can safely ignore this email.
            </p>
          </div>
        `,
      });

      res.json({ message: "OTP sent successfully ✅" });

    } catch (err) {
      console.error("Send OTP error:", err);
      res.status(500).json({ error: "OTP send nahi ho paya, dobara try karo" });
    }
  }
);

/* =========================
   SIGNUP (with OTP verification)
   ✅ Rate limited + input validated + OTP brute-force protected
========================= */
app.post(
  "/signup",
  authLimiter,
  [
    body("name").trim().notEmpty().withMessage("Naam zaroori hai").isLength({ max: 100 }),
    body("email").trim().isEmail().withMessage("Valid email do").normalizeEmail(),
    body("password").isLength({ min: 8 }).withMessage("Password kam se kam 8 character ka ho"),
    body("otp").trim().isLength({ min: 6, max: 6 }).withMessage("OTP 6 digit ka hona chahiye")
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
      }

      const { name, email, password, otp } = req.body;

      const stored = otpStore.get(email);

      if (!stored) {
        return res.status(400).json({ message: "OTP expired or not found. Please resend." });
      }

      if (Date.now() > stored.expiry) {
        otpStore.delete(email);
        return res.status(400).json({ message: "OTP expired. Please resend." });
      }

      // ✅ OTP brute-force protection: 5 galat attempts ke baad OTP invalidate
      if (stored.attempts >= 5) {
        otpStore.delete(email);
        return res.status(400).json({ message: "Bahut zyada galat attempts. Naya OTP lo." });
      }

      if (stored.otp !== otp) {
        stored.attempts += 1;
        return res.status(400).json({ message: "Invalid OTP" });
      }

      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        otpStore.delete(email);
        return res.status(409).json({ message: "User already exists" });
      }

      const newUser = new User({
        name,
        email,
        password,
        isPhoneVerified: false,
        role: 'student',
        isBlocked: false,
        trialStart: new Date(),
      });

      await newUser.save();
      otpStore.delete(email);

      res.json({ message: "User registered successfully ✅" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Signup fail ho gaya, dobara try karo" });
    }
  }
);

/* =========================
   MONGODB CONNECTION
========================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error:", err));

/* =========================
   FRIDAY AI CHAT API
   ✅ Rate limited — Groq API costly hai, abuse se bachao
========================= */
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Bahut zyada AI requests aa gayi hain, thodi der wait karo." }
});

app.post("/ask-ai", aiLimiter, async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== "string" || !question.trim()) {
      return res.status(400).json({ error: "Question is required" });
    }

    if (question.length > 2000) {
      return res.status(400).json({ error: "Question bahut lambi hai (max 2000 characters)" });
    }

    console.log("User Question:", question);

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are an expert IT and Computer Science tutor. Answer only programming and computer science related questions."
        },
        {
          role: "user",
          content: question
        }
      ]
    });

    const answer = completion.choices[0].message.content;
    console.log("AI Answer:", answer);

    const newChat = new Chat({ question, answer });
    await newChat.save();

    res.json({ answer });

  } catch (error) {
    console.error("GROQ ERROR:", error);
    res.status(500).json({ error: "AI se jawab nahi mil paya, dobara try karo" });
  }
});

/* =========================
   GET CHAT HISTORY
========================= */
app.get("/chat-history", protect, async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 });
    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Chat history load nahi ho payi" });
  }
});

/* =========================
   SAVE PROFILE
========================= */
app.post("/save-profile", protect, async (req, res) => {
  try {
    // ✅ email ko logged-in user se lo, body se trust mat karo
    const profile = new Profile({ ...req.body, email: req.user.email });
    await profile.save();
    res.json({ message: "Profile Saved Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Profile save nahi ho payi" });
  }
});

/* =========================
   GET PROFILE
   ✅ Login zaroori + sirf apni profile (admin sabki dekh sakta hai)
========================= */
app.get("/get-profile/:email", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user.email !== req.params.email) {
      return res.status(403).json({ error: "Aap sirf apni profile dekh sakte ho" });
    }

    const profile = await Profile.findOne({ email: req.params.email });
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Profile fetch nahi ho payi" });
  }
});

/* =========================
   UPDATE PROFILE
   ✅ Login zaroori + sirf apni profile update kar sakta hai
========================= */
app.put("/update-profile/:email", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user.email !== req.params.email) {
      return res.status(403).json({ error: "Aap sirf apni profile update kar sakte ho" });
    }

    let profile = await Profile.findOne({ email: req.params.email });

    if (!profile) {
      profile = new Profile({ ...req.body, email: req.params.email });
      await profile.save();
    } else {
      profile = await Profile.findOneAndUpdate(
        { email: req.params.email },
        req.body,
        { new: true }
      );
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Profile update nahi ho payi" });
  }
});

/* =========================
   SIGN IN
   ✅ Rate limited + plain-text fallback hataya + generic error message
========================= */
app.post("/signin", authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email aur password zaroori hai" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email ya password galat hai" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Email ya password galat hai" });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        message: `Account blocked: ${user.blockReason}`
      });
    }

    await User.findByIdAndUpdate(user._id, { lastSeen: new Date() });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login Successful",
      token,
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email,
        role:  user.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login fail ho gaya, dobara try karo" });
  }
});

/* =========================
   FORGOT PASSWORD
========================= */
app.post("/forgot-password", authLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        message: "If that email is registered, a reset link has been sent."
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 60 * 60 * 1000);

    user.resetToken = token;
    user.resetTokenExpiry = expiry;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await transporter.sendMail({
      from: `"Placement Mantra" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:30px;
                    border-radius:12px;background:#f9f9f9;border:1px solid #ddd;">
          <h2 style="color:#6366f1;">Password Reset</h2>
          <p>Hello <strong>${user.name}</strong>,</p>
          <p>We received a request to reset your password. Click the button below:</p>
          <a href="${resetUrl}"
             style="display:inline-block;margin:20px 0;padding:12px 24px;
                    background:linear-gradient(135deg,#6366f1,#ec4899);
                    color:white;text-decoration:none;border-radius:8px;font-weight:bold;">
            Reset My Password
          </a>
          <p style="color:#888;font-size:13px;">
            This link expires in <strong>1 hour</strong>.<br/>
            If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    res.json({
      message: "If that email is registered, a reset link has been sent."
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

/* =========================
   RESET PASSWORD
========================= */
app.post("/reset-password", authLimiter, async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ message: "Password kam se kam 8 character ka hona chahiye" });
    }

    const user = await User.findOne({ resetToken: token });
    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset link."
      });
    }

    if (new Date() > new Date(user.resetTokenExpiry)) {
      return res.status(400).json({
        message: "Reset link has expired. Please request a new one."
      });
    }

    user.password = newPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.json({ message: "Password reset successful! You can now sign in." });

  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

/* =========================
   QUESTIONS SYSTEM
========================= */
const questions = {
  DSA: dsa,
  Web: web,
  Aptitude: aptitude,
  Programming: programming
};

/* =========================
   START TEST
========================= */
app.post("/start-test", (req, res) => {
  const { topic, difficulty } = req.body;

  if (!questions[topic] || !questions[topic][difficulty]) {
    return res.status(400).json({ message: "Invalid topic or difficulty" });
  }

  const selected = questions[topic][difficulty];
  res.json(selected);
});

/* =========================
   SUBMIT TEST
========================= */
app.post("/submit-test", (req, res) => {
  const { answers, questions: qs } = req.body;

  if (!answers || !qs) {
    return res.status(400).json({ message: "Invalid data" });
  }

  let correct = 0;
  qs.forEach((q, index) => {
    if (answers[index] === q.answer) correct++;
  });

  let wrong = qs.length - correct;
  let percentage = ((correct / qs.length) * 100).toFixed(2);

  res.json({ correct, wrong, percentage });
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});