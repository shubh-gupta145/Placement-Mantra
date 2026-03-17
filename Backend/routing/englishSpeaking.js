const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const CATEGORY_LABEL = {
  hr:   "HR Interview",
  tech: "Technical Interview",
  conv: "Daily Conversation",
  gd:   "Group Discussion",
};

router.post("/evaluate", async (req, res) => {
  const { question, answer, category = "hr" } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ error: "question and answer are required." });
  }

  const catLabel = CATEGORY_LABEL[category] || "General";

  const prompt = `You are an expert English speaking evaluator for IT fresher students in India preparing for placement interviews.

A student answered the following question during a ${catLabel} practice session.

Question: "${question}"

Student's spoken answer (voice-to-text transcription): "${answer}"

Evaluate the student's spoken English and return ONLY a valid JSON object in this exact format — no markdown, no extra text:

{
  "pronunciation": <integer 0-100>,
  "fluency": <integer 0-100>,
  "grammar": <integer 0-100>,
  "vocab": <integer 0-100>,
  "confidence": <integer 0-100>,
  "overall": <integer 0-100>,
  "feedback": "<2-3 concise sentences of overall feedback>",
  "suggestions": ["<tip 1>", "<tip 2>", "<tip 3>"],
  "aiSuggestions": ["<advanced AI recommendation 1>", "<advanced AI recommendation 2>"]
}

Scoring rubric:
- pronunciation (20%): clarity of articulation inferred from transcription quality
- fluency (25%): smooth sentence flow, absence of filler words
- grammar (20%): correct tenses, subject-verb agreement
- vocab (15%): range and appropriateness of vocabulary
- confidence (20%): assertive language, completeness of answer
- overall: weighted average using percentages above

Keep all tips short, practical, and encouraging. Return ONLY the JSON object.`;

  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 700,
      messages: [
        {
          role: "system",
          content: "You are an English speaking evaluator. Always respond with valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const raw = completion.choices[0].message.content.trim();
    const clean = raw.replace(/```json|```/g, "").trim();
    const result = JSON.parse(clean);

    // Sanitize & clamp all scores
    const numFields = ["pronunciation", "fluency", "grammar", "vocab", "confidence", "overall"];
    numFields.forEach((k) => {
      result[k] = Math.max(0, Math.min(100, Math.round(Number(result[k]) || 0)));
    });

    if (!Array.isArray(result.suggestions))   result.suggestions   = [];
    if (!Array.isArray(result.aiSuggestions)) result.aiSuggestions = [];
    if (typeof result.feedback !== "string")  result.feedback      = "";

    console.log("✅ Groq AI evaluation success!");
    return res.json({ result });

  } catch (err) {
    console.error("❌ Groq evaluation failed:", err.message);

    // Fallback local scoring
    const words     = answer.trim().split(/\s+/).length;
    const sentences = answer.split(/[.!?]+/).filter((s) => s.trim()).length;
    const unique    = new Set(answer.toLowerCase().split(/\s+/)).size;
    const avgWPS    = sentences > 0 ? words / sentences : words;
    const clamp     = (v) => Math.max(0, Math.min(100, Math.round(v)));
    const rand      = (n) => Math.random() * n;

    const pronunciation = clamp(55 + Math.min(words, 40) * 0.5 + rand(10));
    const fluency       = clamp(40 + Math.min(words, 80) * 0.6 + rand(8));
    const grammar       = clamp(50 + (avgWPS > 5 ? 20 : 8) + rand(12));
    const vocab         = clamp(50 + unique * 0.85 + rand(8));
    const confidence    = clamp(45 + Math.min(words, 60) * 0.5 + rand(10));
    const overall       = clamp(
      pronunciation * 0.20 + fluency * 0.25 +
      grammar * 0.20 + vocab * 0.15 + confidence * 0.20
    );

    const suggestions = [];
    if (pronunciation < 70) suggestions.push("Slow down and articulate each word clearly.");
    if (fluency < 70)       suggestions.push("Practice speaking 2 minutes daily on any topic.");
    if (grammar < 70)       suggestions.push("Focus on using correct tenses consistently.");
    if (vocab < 70)         suggestions.push("Read English tech articles to grow vocabulary.");
    if (confidence < 70)    suggestions.push("Record yourself and review to build confidence.");
    if (!suggestions.length) suggestions.push("Great effort — keep this consistency!");

    const feedback =
      overall >= 80 ? "Excellent! Your spoken English is clear and well-structured." :
      overall >= 60 ? "Good attempt! Work on sentence variety and vocabulary." :
      "Keep practicing. Complete sentences and steady pacing will help a lot.";

    return res.json({
      result: {
        pronunciation, fluency, grammar, vocab,
        confidence, overall, feedback,
        suggestions, aiSuggestions: []
      }
    });
  }
});

module.exports = router;