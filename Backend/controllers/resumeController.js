const fs = require("fs");
const pdf = require("pdf-parse");

const { extractResumeData } = require("../utils/resumeParser");
const { generateQuestions } = require("../utils/questionGenerator");

const parseResume = async (req, res) => {
  try {
    const filePath = req.file.path;

    const buffer = fs.readFileSync(filePath);

    const data = await pdf(buffer);

    const text = data.text;

    const extractedData = extractResumeData(text);

    const questions = generateQuestions(extractedData);

    res.json({
      extractedData,
      questions
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error parsing resume" });
  }
};

module.exports = { parseResume };