const express = require("express");
const router = express.Router();

const { parseResume } = require("../controllers/resumeController");

router.post("/upload", parseResume);

module.exports = router;