const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

router.post("/feedback", async (req, res) => {
  try {

    const newFeedback = new Feedback({
      message: req.body.message
    });

    await newFeedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback saved"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;