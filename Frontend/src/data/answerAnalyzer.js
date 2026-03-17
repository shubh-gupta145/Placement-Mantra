// ============================================================
//  answerAnalyzer.js  –  Placement Mantra Mock Interview
//  Analyzes user answers and returns detailed feedback
// ============================================================

// ─── Negative words list (Hindi / informal) ─────────────────
const NEGATIVE_WORDS = [
  // Hindi filler / slang
  "matlab",
  "woh",
  "yaar",
  "bhai",
  "bro",
  "arrey",
  "arre",
  "haan",
  "nahi",
  "toh",
  "aur",
  "kya",
  "bas",
  "thoda",
  "bohot",
  "bahut",
  "accha",
  "achha",
  "bilkul",
  "dekho",
  "suno",
  "samjhe",
  "bolun",
  "bol",
  "karke",
  "karte",
  "kiya",
  "ho",
  "hai",
  "tha",
  "thi",
  "mera",
  "meri",
  "mere",
  "mujhe",
  "humne",
  "hamara",
  "unka",
  "uska",
  "uski",
  "iska",
  "isliye",
  "kyunki",
  "phir",
  "fir",
  "pehle",
  "baad",
  "lekin",
  "par",
  "aisa",
  "waisa",
  "itna",
  "utna",
  "sab",
  "kuch",
  "koi",
  "sabhi",
  "zaroor",
  "jaise",
  "waisa",
  "seedha",
  "sahi",
  "galat",
  // Very informal English slang
  "gonna",
  "wanna",
  "gotta",
  "kinda",
  "sorta",
  "dunno",
  "lemme",
  "gimme",
  "y'all",
  "ain't",
  "nope",
  "yep",
  "yup",
  "omg",
  "lol",
  "btw",
  "tbh",
  "idk",
  "imo",
  "fyi",
];

// ─── Positive signal words ───────────────────────────────────
const POSITIVE_KEYWORDS = [
  "implemented",
  "developed",
  "built",
  "created",
  "designed",
  "managed",
  "led",
  "optimized",
  "improved",
  "achieved",
  "collaborated",
  "contributed",
  "delivered",
  "resolved",
  "analyzed",
  "deployed",
  "integrated",
  "automated",
  "maintained",
  "documented",
  "experience",
  "proficient",
  "expertise",
  "responsible",
  "successfully",
];

// ─── Filler words (reduce fluency score) ────────────────────
const FILLER_WORDS = [
  "um",
  "uh",
  "like",
  "you know",
  "basically",
  "literally",
  "actually",
  "honestly",
  "right",
  "so yeah",
  "i mean",
  "kind of",
  "sort of",
];

// ─── Category labels (used in result) ────────────────────────
export const SCORE_CATEGORIES = {
  communication: "Communication",
  technical: "Technical Content",
  fluency: "Language Fluency",
  confidence: "Confidence",
  relevance: "Answer Relevance",
};

// ─── Analyze a single answer ─────────────────────────────────
export function analyzeAnswer(question, answer) {
  if (!answer || answer.trim().length < 5) {
    return {
      score: 0,
      negativeWords: [],
      fillerWords: [],
      positiveWords: [],
      wordCount: 0,
      feedback: "No answer detected.",
    };
  }

  const lower = answer.toLowerCase();
  const words = lower.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Detect negative words
  const foundNegative = NEGATIVE_WORDS.filter((w) =>
    lower.includes(w.toLowerCase())
  );

  // Detect filler words
  const foundFillers = FILLER_WORDS.filter((w) => lower.includes(w));

  // Detect positive keywords
  const foundPositive = POSITIVE_KEYWORDS.filter((w) => lower.includes(w));

  // ── Scoring ─────────────────────────────────────────────────
  let score = 50; // base

  // Length bonus (more words = more complete answer)
  if (wordCount >= 20) score += 10;
  if (wordCount >= 40) score += 10;
  if (wordCount >= 80) score += 5;

  // Positive keyword bonus
  score += Math.min(foundPositive.length * 3, 15);

  // Negative word penalty (-3 each, max -30)
  score -= Math.min(foundNegative.length * 3, 30);

  // Filler word penalty (-2 each, max -20)
  score -= Math.min(foundFillers.length * 2, 20);

  // Clamp 0–100
  score = Math.max(0, Math.min(100, score));

  // ── Feedback ────────────────────────────────────────────────
  let feedback = "";
  if (score >= 80) feedback = "Excellent answer! Very professional and detailed.";
  else if (score >= 60) feedback = "Good answer. Try to avoid informal words and add more specific examples.";
  else if (score >= 40) feedback = "Average answer. Work on using professional English and structuring your response.";
  else feedback = "Needs improvement. Avoid Hindi/informal words and practice speaking in structured English.";

  return {
    score,
    negativeWords: foundNegative,
    fillerWords: foundFillers,
    positiveWords: foundPositive,
    wordCount,
    feedback,
  };
}

// ─── Analyze full interview (array of Q&A pairs) ─────────────
export function analyzeInterview(qaList, role, timing) {
  if (!qaList || qaList.length === 0) {
    return {
      overallScore: 0,
      grade: "F",
      summary: "No answers were recorded.",
      categories: {},
      details: [],
      strongPoints: [],
      improvements: [],
    };
  }

  const details = qaList.map(({ question, answer }) => ({
    question,
    answer,
    analysis: analyzeAnswer(question, answer),
  }));

  const answeredCount = details.filter((d) => d.analysis.wordCount > 0).length;
  const totalScore = details.reduce((sum, d) => sum + d.analysis.score, 0);
  const overallScore = Math.round(totalScore / details.length);

  // Category scores (approximate)
  const avgWordCount =
    details.reduce((s, d) => s + d.analysis.wordCount, 0) / details.length;
  const totalNegative = details.reduce(
    (s, d) => s + d.analysis.negativeWords.length,
    0
  );
  const totalPositive = details.reduce(
    (s, d) => s + d.analysis.positiveWords.length,
    0
  );
  const totalFillers = details.reduce(
    (s, d) => s + d.analysis.fillerWords.length,
    0
  );

  const fluency = Math.max(
    0,
    Math.min(100, 90 - totalFillers * 4 - totalNegative * 3)
  );
  const confidence = Math.max(
    0,
    Math.min(100, 60 + Math.min(answeredCount * 8, 40))
  );
  const relevance = Math.max(
    0,
    Math.min(100, 50 + Math.min(totalPositive * 4, 40) - totalNegative * 2)
  );
  const communication = Math.round(
    (fluency + confidence + relevance + overallScore) / 4
  );
  const technical = Math.max(
    0,
    Math.min(100, overallScore + totalPositive * 2 - totalNegative * 3)
  );

  const categories = {
    communication,
    technical,
    fluency,
    confidence,
    relevance,
  };

  // Grade
  let grade = "F";
  if (overallScore >= 90) grade = "A+";
  else if (overallScore >= 80) grade = "A";
  else if (overallScore >= 70) grade = "B";
  else if (overallScore >= 60) grade = "C";
  else if (overallScore >= 50) grade = "D";

  // Summary
  const summary =
    overallScore >= 75
      ? `Great performance! You demonstrated strong knowledge and professional communication for the ${role} role.`
      : overallScore >= 55
      ? `Decent performance for ${role}. Focus on reducing informal language and adding more technical depth.`
      : `You need more practice for the ${role} role. Work on professional English and structured answers.`;

  // Strong points
  const strongPoints = [];
  if (fluency >= 70) strongPoints.push("Good language fluency with minimal filler words.");
  if (confidence >= 70) strongPoints.push("Answered most questions — shows good confidence.");
  if (technical >= 70) strongPoints.push("Demonstrated relevant technical knowledge.");
  if (relevance >= 70) strongPoints.push("Answers were relevant and well-structured.");
  if (avgWordCount >= 40) strongPoints.push("Gave detailed and elaborate answers.");
  if (strongPoints.length === 0) strongPoints.push("You attempted the interview — that itself takes courage!");

  // Improvements
  const improvements = [];
  if (totalNegative > 3) improvements.push(`Avoid Hindi/informal words in professional interviews (found: ${totalNegative} instances).`);
  if (totalFillers > 4) improvements.push(`Reduce filler words like "um", "like", "basically" (found: ${totalFillers} instances).`);
  if (avgWordCount < 20) improvements.push("Give more detailed answers — aim for at least 3-4 sentences per question.");
  if (technical < 60) improvements.push("Strengthen your technical knowledge for the " + role + " role.");
  if (confidence < 60) improvements.push("Try to answer every question — even a short attempt is better than silence.");
  if (improvements.length === 0) improvements.push("Keep practising regularly to maintain and improve your performance.");

  return {
    overallScore,
    grade,
    summary,
    categories,
    details,
    strongPoints,
    improvements,
    totalNegativeWords: totalNegative,
    answeredCount,
    totalQuestions: details.length,
    role,
    timing,
  };
}