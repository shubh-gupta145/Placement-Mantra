require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Groq = require("groq-sdk");
const crypto = require("crypto");       // ✅ NEW: for secure token generation
const nodemailer = require("nodemailer"); // ✅ NEW: for sending reset emails
const resumeRoutes = require("./routing/resumeRoutes");
const englishSpeakingRoutes = require("./routing/englishSpeaking");

/* =========================
   PROFILE MODEL
========================= */

const Profile = require("./models/ProfileUser");

/* =========================
   CHAT MODEL
========================= */

const Chat = require("./models/Chat");

/* =========================
   QUESTIONS FILES
========================= */

const dsa = require("./questions/dsaQuestions");
const web = require("./questions/webQuestions");
const aptitude = require("./questions/aptitudeQuestions");
const programming = require("./questions/programmingQuestions");

const feedbackRoute = require("./routing/feedback");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", resumeRoutes);
app.use("/api", feedbackRoute);
app.use("/api/english-speaking", englishSpeakingRoutes);

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
   NODEMAILER SETUP       ✅ NEW
========================= */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,  // your Gmail address in .env
    pass: process.env.EMAIL_PASS,  // Gmail App Password in .env
  },
});

/* =========================
   FRIDAY AI CHAT API
========================= */

app.post("/ask-ai", async (req, res) => {

  try {

    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
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

    /* Save Chat */

    const newChat = new Chat({
      question,
      answer
    });

    await newChat.save();

    res.json({ answer });

  }

  catch (error) {

    console.error("GROQ ERROR:", error);

    res.status(500).json({
      error: "Server Error",
      details: error.message
    });

  }

});

/* =========================
   GET CHAT HISTORY
========================= */

app.get("/chat-history", async (req, res) => {

  try {

    const chats = await Chat.find().sort({ createdAt: -1 });

    res.json(chats);

  }

  catch (error) {

    console.error(error);

    res.status(500).json({ error: error.message });

  }

});

/* =========================
   SAVE PROFILE
========================= */

app.post("/save-profile", async (req, res) => {

  try {

    const profile = new Profile(req.body);

    await profile.save();

    res.json({ message: "Profile Saved Successfully" });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({ error: error.message });

  }

});

/* =========================
   GET PROFILE
========================= */

app.get("/get-profile/:email", async (req, res) => {

  try {

    const profile = await Profile.findOne({ email: req.params.email });

    res.json(profile);

  }

  catch (error) {

    console.error(error);

    res.status(500).json({ error: error.message });

  }

});

/* =========================
   UPDATE PROFILE
========================= */

app.put("/update-profile/:email", async (req, res) => {

  try {

    let profile = await Profile.findOne({ email: req.params.email });

    if (!profile) {

      profile = new Profile(req.body);
      await profile.save();

    }

    else {

      profile = await Profile.findOneAndUpdate(
        { email: req.params.email },
        req.body,
        { new: true }
      );

    }

    res.json(profile);

  }

  catch (error) {

    console.error(error);

    res.status(500).json({ error: error.message });

  }

});

/* =========================
   MongoDB Connection
========================= */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error:", err));

/* =========================
   USER SCHEMA
========================= */

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  // ✅ NEW: Reset token fields added directly on User schema
  resetToken: {
    type: String,
    default: null
  },

  resetTokenExpiry: {
    type: Date,
    default: null
  }

});

const User = mongoose.model("User", userSchema);

/* =========================
   SIGN UP
========================= */

app.post("/signup", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();

    res.json({ message: "Signup Successful" });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({ error: error.message });

  }

});

/* =========================
   SIGN IN
========================= */

app.post("/signin", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.json({ message: "Wrong Password" });
    }

    res.json({ message: "Login Successful" });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({ error: error.message });

  }

});

/* =========================
   FORGOT PASSWORD         ✅ NEW
   - Generates secure token
   - Saves token + expiry on User document
   - Emails reset link to user
========================= */

app.post("/forgot-password", async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    // Generic message so we don't reveal if email exists
    if (!user) {
      return res.json({ message: "If that email is registered, a reset link has been sent." });
    }

    // Generate a secure random token
    const token = crypto.randomBytes(32).toString("hex");

    // Set expiry to 1 hour from now
    const expiry = new Date(Date.now() + 60 * 60 * 1000);

    // Save token and expiry directly on the user document
    user.resetToken = token;
    user.resetTokenExpiry = expiry;
    await user.save();

    // Build the reset URL (your frontend route)
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    // Send the email
    await transporter.sendMail({
      from: `"Your App" <${process.env.EMAIL_USER}>`,
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

    res.json({ message: "If that email is registered, a reset link has been sent." });

  }

  catch (error) {

    console.error("Forgot Password Error:", error);

    res.status(500).json({ message: "Server error. Please try again." });

  }

});

/* =========================
   RESET PASSWORD          ✅ NEW
   - Validates token + expiry
   - Updates password on User
   - Clears token fields
========================= */

app.post("/reset-password", async (req, res) => {

  try {

    const { token, newPassword } = req.body;

    // Find user with this token
    const user = await User.findOne({ resetToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset link." });
    }

    // Check if token has expired
    if (new Date() > new Date(user.resetTokenExpiry)) {
      return res.status(400).json({ message: "Reset link has expired. Please request a new one." });
    }

    // Update password (plain text to match your current signin logic)
    user.password = newPassword;

    // Clear the token fields so the link can't be reused
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    res.json({ message: "Password reset successful! You can now sign in." });

  }

  catch (error) {

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

    if (answers[index] === q.answer) {
      correct++;
    }

  });

  let wrong = qs.length - correct;

  let percentage = ((correct / qs.length) * 100).toFixed(2);

  res.json({
    correct,
    wrong,
    percentage
  });

});

/* =========================
   SERVER START
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});