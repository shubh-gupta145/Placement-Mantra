const express = require("express");
const router = express.Router();
const TestResult = require("../models/TestResult.js");

// ── Save result ───────────────────────────────────────────────────────────────
router.post("/save", async (req, res) => {
  try {
    const result = new TestResult(req.body);
    await result.save();
    res.json({ message: "Result saved ✅", id: result._id });
  } catch (err) {
    console.error("Save result error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ── Get all results for a user ────────────────────────────────────────────────
router.get("/:email", async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email); // ← yeh add karo
    const results = await TestResult.find({ email })
      .sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Delete a result ───────────────────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    await TestResult.findByIdAndDelete(req.params.id);
    res.json({ message: "Result deleted ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;