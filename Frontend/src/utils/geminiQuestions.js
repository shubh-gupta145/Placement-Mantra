// geminiQuestions.js
// Gemini API se resume-based interview questions generate karta hai (FREE)
// API key: Google AI Studio se free milti hai -> https://aistudio.google.com/

const GEMINI_API_KEY = "AIzaSyD3Df-oTilRGHsCf-CAehf2zXd1FsEmBzY"; // 🔑 Yahan apni key daalo
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Resume text aur role ke basis pe interview questions generate karo
 * @param {string} resumeText - PDF se extracted text
 * @param {string} role - Job title (e.g. "Frontend Developer")
 * @param {number} timing - Minutes (15 ya 30)
 * @returns {Promise<string[]>} - Questions ka array
 */
export async function generateQuestionsFromResume(resumeText, role, timing) {
  // Timing ke basis pe kitne questions chahiye
  const questionCount = timing === 30 ? 20 : timing === 15 ? 12 : 5;

  const prompt = `
Tum ek experienced technical HR interviewer ho jo ${role} ke liye interview le raha hai.

Candidate ka resume:
"""
${resumeText.substring(0, 3000)}
"""

Upar diye gaye resume ko dhyan se padho aur ${questionCount} interview questions banao jo:
1. Resume mein likhe specific skills, projects, aur experience pe focused ho
2. Role (${role}) ke liye relevant ho
3. Mix ho: technical questions (60%), behavioral (20%), project-specific (20%)
4. Progressive ho — easy se hard ki taraf

IMPORTANT:
- Sirf questions return karo, numbered list mein
- Koi extra text, intro, ya explanation mat likho
- Har question ek hi line mein ho
- Hindi ya Hinglish mat likho, English mein likho

Format:
1. Question text here
2. Question text here
...
`;

  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1500,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Parse numbered list → array of strings
    const questions = rawText
      .split("\n")
      .filter((line) => /^\d+\./.test(line.trim()))
      .map((line) => line.replace(/^\d+\.\s*/, "").trim())
      .filter((q) => q.length > 10);

    return questions.length > 0 ? questions : null;
  } catch (err) {
    console.error("Gemini question generation failed:", err);
    return null; // Fallback to default questions
  }
}