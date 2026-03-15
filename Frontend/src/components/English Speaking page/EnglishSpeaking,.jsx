import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./EnglishSpeaking.module.css";
import axios from "axios";

// ── Question Bank ──────────────────────────────────────────────────────────────
const QUESTIONS = {
  hr: [
    "Tell me about yourself.",
    "What are your greatest strengths and weaknesses?",
    "Where do you see yourself in five years?",
    "Why do you want to work in the IT industry?",
    "How do you handle pressure and tight deadlines?",
    "Describe a challenge you faced and how you overcame it.",
    "What motivates you to do your best work every day?",
    "Are you a team player? Give a specific example.",
    "What do you know about our company and its products?",
    "Do you have any questions you'd like to ask us?",
    "How do you prioritize when managing multiple tasks?",
    "What makes you the right candidate for this role?",
  ],
  tech: [
    "Explain the concept of Object-Oriented Programming.",
    "What is the difference between a stack and a queue?",
    "Describe how HTTP and HTTPS differ from each other.",
    "What is normalization in databases and why is it important?",
    "Explain what an API is in simple terms.",
    "What is version control and why is it important?",
    "Describe the MVC architecture pattern with an example.",
    "What are the main differences between SQL and NoSQL?",
    "Explain what responsive design means in web development.",
    "What is cloud computing? Name some popular cloud providers.",
    "What is the difference between GET and POST requests?",
    "Explain what a RESTful API is.",
  ],
  conv: [
    "Describe your daily routine in detail.",
    "What are your hobbies and how did you develop interest in them?",
    "Talk about a recent movie or book you enjoyed.",
    "Describe your hometown and what makes it special.",
    "What are the benefits of learning English for IT professionals?",
    "Talk about a trip you have taken or would love to take.",
    "Describe your ideal work environment and why.",
    "What do you do to stay updated with technology trends?",
    "Talk about a person who has greatly influenced your life.",
    "Describe how technology has changed daily life in India.",
  ],
  gd: [
    "Should social media be regulated by the government?",
    "Is work-from-home more productive than working from office?",
    "Should coding be a mandatory subject in schools?",
    "Is artificial intelligence a threat to jobs in India?",
    "Online learning versus traditional classroom — which is better?",
    "Is technology making people more isolated from each other?",
    "Should companies prioritize profit or social responsibility?",
    "Is a college degree still necessary in the digital age?",
    "Climate change — whose responsibility is it to act?",
    "Should internet access be considered a basic human right?",
  ],
};

const CATEGORY_META = {
  hr:   { label: "HR Interview",       tagClass: "tag_hr" },
  tech: { label: "Technical",          tagClass: "tag_tech" },
  conv: { label: "Daily Conversation", tagClass: "tag_conv" },
  gd:   { label: "Group Discussion",   tagClass: "tag_gd" },
};

const SCORE_KEYS = [
  { key: "pronunciation", label: "Pronunciation" },
  { key: "fluency",       label: "Fluency" },
  { key: "grammar",       label: "Grammar" },
  { key: "vocab",         label: "Vocabulary" },
  { key: "confidence",    label: "Confidence" },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function clamp(v, lo = 0, hi = 100) {
  return Math.max(lo, Math.min(hi, Math.round(v)));
}

function scoreClass(v) {
  if (v >= 75) return styles.good;
  if (v >= 55) return styles.avg;
  return styles.low;
}

function fillClass(v) {
  if (v >= 75) return styles.fillGood;
  if (v >= 55) return styles.fillAvg;
  return styles.fillLow;
}

function localScore(text) {
  if (!text) {
    return {
      pronunciation: 0, fluency: 0, grammar: 0, vocab: 0, confidence: 0, overall: 0,
      feedback: "No answer recorded. Speak clearly into your microphone.",
      suggestions: [
        "Enable microphone permissions in your browser settings.",
        "Speak clearly and at a moderate pace.",
        "Take a breath before starting — confidence matters!",
      ],
      aiSuggestions: [],
    };
  }
  const words     = text.trim().split(/\s+/).length;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
  const unique    = new Set(text.toLowerCase().split(/\s+/)).size;
  const avgWPS    = sentences > 0 ? words / sentences : words;

  const pronunciation = clamp(55 + Math.min(words, 40) * 0.5 + Math.random() * 12);
  const fluency       = clamp(40 + Math.min(words, 80) * 0.6 + Math.random() * 8);
  const grammar       = clamp(50 + (avgWPS > 5 ? 20 : 8) + Math.random() * 14);
  const vocab         = clamp(50 + unique * 0.85 + Math.random() * 8);
  const confidence    = clamp(45 + Math.min(words, 60) * 0.5 + Math.random() * 12);
  const overall       = clamp(pronunciation * 0.2 + fluency * 0.25 + grammar * 0.2 + vocab * 0.15 + confidence * 0.2);

  const suggestions = [];
  if (pronunciation < 70) suggestions.push("Practice tongue twisters daily to improve speech clarity.");
  if (fluency < 70)       suggestions.push("Speak in complete sentences and avoid filler words like 'umm'.");
  if (grammar < 70)       suggestions.push("Review subject-verb agreement and consistent tense usage.");
  if (vocab < 70)         suggestions.push("Read English tech articles daily to build professional vocabulary.");
  if (confidence < 70)    suggestions.push("Record and listen to yourself — it builds confidence over time.");
  if (!suggestions.length) suggestions.push("Excellent! Keep practicing to maintain this performance.");

  const feedback =
    overall >= 80 ? "Excellent! Your answer was clear, structured, and confident." :
    overall >= 60 ? "Good effort! More detail and varied vocabulary would strengthen your answer." :
    "Keep practicing. Focus on speaking in complete, clear sentences.";

  return { pronunciation, fluency, grammar, vocab, confidence, overall, feedback, suggestions, aiSuggestions: [] };
}

// ── Main Component ─────────────────────────────────────────────────────────────
function EnglishSpeaking() {
  // Setup
  const [view, setView]           = useState("setup");
  const [category, setCategory]   = useState("hr");
  const [totalQ, setTotalQ]       = useState(10);
  const [timerInput, setTimerInput] = useState("60");
  const [timerError, setTimerError] = useState("");

  // Session
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ]   = useState(0);
  const [transcript, setTranscript] = useState("");
  const [recording, setRecording]   = useState(false);
  const [timeLeft, setTimeLeft]     = useState(60);
  const [timePerQ, setTimePerQ]     = useState(60);
  const [analyzing, setAnalyzing]   = useState(false);
  const [result, setResult]         = useState(null);
  const [scores, setScores]         = useState([]);

  // Done
  const [sessionData, setSessionData] = useState(null);

  const recognitionRef  = useRef(null);
  const timerRef        = useRef(null);
  const transcriptRef   = useRef("");
  const prevRecordingRef = useRef(false);

  useEffect(() => { transcriptRef.current = transcript; }, [transcript]);

  // TTS
  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9; u.pitch = 1;
    window.speechSynthesis.speak(u);
  }, []);

  // Timer
  const stopTimer = useCallback(() => clearInterval(timerRef.current), []);

  const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current); return 0; }
        return t - 1;
      });
    }, 1000);
  }, [stopTimer]);

  useEffect(() => {
    if (timeLeft === 0 && recording) doStopRecording();
  }, [timeLeft]); // eslint-disable-line

  // Recording
  const doStartRecording = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert("Speech Recognition not supported. Please use Google Chrome.");
      return;
    }
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";
    rec.onresult = (e) => {
      let full = "";
      for (let i = 0; i < e.results.length; i++) full += e.results[i][0].transcript + " ";
      setTranscript(full.trim());
    };
    rec.onerror = () => {};
    rec.start();
    recognitionRef.current = rec;
    setRecording(true);
    startTimer();
  }, [startTimer]);

  const doStopRecording = useCallback(() => {
    try { recognitionRef.current?.stop(); } catch (_) {}
    stopTimer();
    setRecording(false);
  }, [stopTimer]);

  // Evaluate when recording stops
  useEffect(() => {
    if (prevRecordingRef.current && !recording && view === "session" && !result && !analyzing) {
      doEvaluate(transcriptRef.current);
    }
    prevRecordingRef.current = recording;
  }, [recording]); // eslint-disable-line

  const doEvaluate = async (text) => {
    setAnalyzing(true);
    try {
      const { data } = await axios.post("/api/english-speaking/evaluate", {
        question: questions[currentQ],
        answer: text,
        category,
      });
      const r = data.result;
      setResult(r);
      setScores((prev) => [...prev, r.overall]);
    } catch {
      const r = localScore(text);
      setResult(r);
      setScores((prev) => [...prev, r.overall]);
    } finally {
      setAnalyzing(false);
    }
  };

  // Start session
  const handleStartSession = () => {
    const val = parseInt(timerInput, 10);
    if (!timerInput || isNaN(val) || val < 15 || val > 600) {
      setTimerError("Please enter a value between 15 and 600 seconds.");
      return;
    }
    setTimerError("");
    setTimePerQ(val);
    const qs = shuffle(QUESTIONS[category]).slice(0, totalQ);
    setQuestions(qs);
    setCurrentQ(0);
    setScores([]);
    setResult(null);
    setTranscript("");
    setTimeLeft(val);
    setView("session");
    setTimeout(() => speak(qs[0]), 500);
  };

  // Next question
  const handleNext = () => {
    const next = currentQ + 1;
    if (next >= totalQ) {
      const allScores = [...scores];
      const avg = allScores.length
        ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
        : 0;
      setSessionData({ avg, scores: allScores });
      setView("done");
      return;
    }
    setCurrentQ(next);
    setResult(null);
    setTranscript("");
    setRecording(false);
    stopTimer();
    setTimeLeft(timePerQ);
    setTimeout(() => speak(questions[next]), 300);
  };

  const handleSkip = () => {
    doStopRecording();
    setTranscript("");
    const r = localScore("");
    setResult(r);
    setScores((prev) => [...prev, 0]);
  };

  const avgScore   = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
  const circumference = 213.6;
  const timerPct   = timePerQ > 0 ? timeLeft / timePerQ : 0;
  const strokeColor = timeLeft <= 10 ? "#dc2626" : timeLeft <= 20 ? "#d97706" : "#2563eb";

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <span className={styles.badge}>Placement Mantra</span>
        <h1 className={styles.title}>English Speaking Lab</h1>
        <p className={styles.subtitle}>AI-powered spoken English practice — built for IT fresher students</p>
      </div>

      {/* ══════════ SETUP ══════════ */}
      {view === "setup" && (
        <div className={styles.setupView}>
          <div className={styles.setupGrid}>

            {/* Category selector */}
            <div className={styles.setupCard}>
              <div className={styles.setupLabel}>Question Category</div>
              <div className={styles.catGrid}>
                {Object.entries(CATEGORY_META).map(([k, { label, tagClass }]) => (
                  <button
                    key={k}
                    className={`${styles.catPill} ${styles[tagClass]} ${category === k ? styles.catPillActive : ""}`}
                    onClick={() => setCategory(k)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Session length */}
            <div className={styles.setupCard}>
              <div className={styles.setupLabel}>Session Length</div>
              <div className={styles.pillGroup}>
                {[5, 10, 15].map((n) => (
                  <button
                    key={n}
                    className={`${styles.pill} ${totalQ === n ? styles.pillActive : ""}`}
                    onClick={() => setTotalQ(n)}
                  >
                    {n} Questions
                  </button>
                ))}
              </div>
            </div>

            {/* Custom timer */}
            <div className={styles.setupCard}>
              <div className={styles.setupLabel}>Answer Time per Question</div>
              <div className={styles.timerInputRow}>
                <input
                  type="number"
                  className={`${styles.timerInput} ${timerError ? styles.timerInputError : ""}`}
                  value={timerInput}
                  min={15}
                  max={600}
                  onChange={(e) => { setTimerInput(e.target.value); setTimerError(""); }}
                  placeholder="60"
                />
                <span className={styles.timerUnit}>seconds</span>
              </div>
              <p className={styles.timerHint}>Range: 15s minimum — 600s maximum</p>
              {timerError && <p className={styles.timerErr}>{timerError}</p>}
              <div className={styles.presetRow}>
                {[30, 60, 90, 120, 180].map((t) => (
                  <button
                    key={t}
                    className={`${styles.presetChip} ${timerInput === String(t) ? styles.presetChipActive : ""}`}
                    onClick={() => { setTimerInput(String(t)); setTimerError(""); }}
                  >
                    {t}s
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.startWrap}>
            <button className={styles.bigBtn} onClick={handleStartSession}>
              Start Practice Session
            </button>
            <p className={styles.micNote}>Microphone must be enabled · Works best in Google Chrome</p>
          </div>
        </div>
      )}

      {/* ══════════ SESSION ══════════ */}
      {view === "session" && (
        <div className={styles.sessionView}>

          <div className={styles.progressWrap}>
            <div className={styles.progressFill} style={{ width: `${(currentQ / totalQ) * 100}%` }} />
          </div>

          <div className={styles.statsBar}>
            <div className={styles.stat}>
              <span className={styles.statN}>{currentQ + 1}</span>
              <span className={styles.statL}>Question</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statN}>{totalQ}</span>
              <span className={styles.statL}>Total</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statN}>{avgScore != null ? `${avgScore}%` : "—"}</span>
              <span className={styles.statL}>Avg Score</span>
            </div>
            <div className={styles.spacer} />
            <svg className={styles.timerRing} viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="#e5e7eb" strokeWidth="5" />
              <circle
                cx="40" cy="40" r="34" fill="none"
                stroke={strokeColor} strokeWidth="5" strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - timerPct)}
                transform="rotate(-90 40 40)"
                style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}
              />
              <text x="40" y="46" textAnchor="middle" fontSize="15" fontWeight="600" fill="#111827">
                {timeLeft}
              </text>
            </svg>
          </div>

          <div className={styles.questionCard}>
            <div className={styles.qMeta}>
              <span className={`${styles.qTag} ${styles[CATEGORY_META[category].tagClass]}`}>
                {CATEGORY_META[category].label}
              </span>
              <span className={styles.qNum}>Q{currentQ + 1} / {totalQ}</span>
            </div>
            <p className={styles.qText}>{questions[currentQ]}</p>
          </div>

          <div className={styles.controls}>
            {!result && !analyzing && (
              <>
                <button
                  className={`${styles.btn} ${recording ? styles.btnDanger : styles.btnPrimary}`}
                  onClick={recording ? doStopRecording : doStartRecording}
                >
                  {recording ? "Stop Recording" : "Start Recording"}
                </button>
                <button className={styles.btn} onClick={handleSkip}>Skip</button>
              </>
            )}
            {result && !analyzing && (
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleNext}>
                {currentQ + 1 >= totalQ ? "View Final Results →" : "Next Question →"}
              </button>
            )}
            {recording && (
              <div className={styles.recIndicator}>
                <span className={styles.recDot} />
                Recording...
                <div className={styles.waveform}>
                  {[1,2,3,4,5].map((i) => <span key={i} />)}
                </div>
              </div>
            )}
            {analyzing && (
              <div className={styles.analyzing}>
                <span className={styles.spinner} />
                Analyzing with AI...
              </div>
            )}
          </div>

          <div className={`${styles.transcriptBox} ${!transcript ? styles.placeholder : ""}`}>
            {transcript || "Your spoken answer will appear here as you speak..."}
          </div>

          {result && (
            <div className={styles.resultSection}>
              <div className={styles.resultHeader}>Answer Analysis</div>
              <div className={styles.scoresGrid}>
                {SCORE_KEYS.map(({ key, label }) => (
                  <div key={key} className={styles.scoreCard}>
                    <div className={styles.scoreLabel}>{label}</div>
                    <div className={`${styles.scoreVal} ${scoreClass(result[key])}`}>{result[key]}%</div>
                    <div className={styles.scoreBar}>
                      <div className={`${styles.scoreBarFill} ${fillClass(result[key])}`} style={{ width: `${result[key]}%` }} />
                    </div>
                  </div>
                ))}
                <div className={`${styles.scoreCard} ${styles.overallCard}`}>
                  <div className={styles.scoreLabel}>Overall</div>
                  <div className={`${styles.scoreVal} ${scoreClass(result.overall)}`}>{result.overall}%</div>
                  <div className={styles.scoreBar}>
                    <div className={`${styles.scoreBarFill} ${fillClass(result.overall)}`} style={{ width: `${result.overall}%` }} />
                  </div>
                </div>
              </div>
              <div className={styles.feedbackCard}>
                <h3>Feedback</h3>
                <p>{result.feedback}</p>
              </div>
              <div className={styles.feedbackCard}>
                <h3>Suggestions</h3>
                <ul className={styles.suggestionList}>
                  {result.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              {result.aiSuggestions?.length > 0 && (
                <div className={`${styles.feedbackCard} ${styles.aiCard}`}>
                  <h3>AI Recommendations</h3>
                  <ul className={styles.suggestionList}>
                    {result.aiSuggestions.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ══════════ DONE ══════════ */}
      {view === "done" && sessionData && (
        <div className={styles.doneView}>
          <span className={styles.badge}>Session Complete</span>
          <div className={styles.bigScore}>{sessionData.avg}%</div>
          <p className={styles.doneSubtitle}>Overall Performance Score</p>
          <div className={styles.scoresGrid} style={{ marginTop: "1.5rem", textAlign: "left" }}>
            {[
              { label: "Pronunciation", delta: +3 },
              { label: "Fluency",       delta: +5 },
              { label: "Grammar",       delta: -4 },
              { label: "Vocabulary",    delta: -2 },
              { label: "Confidence",    delta: +1 },
            ].map(({ label, delta }) => {
              const val = clamp(sessionData.avg + delta);
              return (
                <div key={label} className={styles.scoreCard}>
                  <div className={styles.scoreLabel}>{label}</div>
                  <div className={`${styles.scoreVal} ${scoreClass(val)}`}>{val}%</div>
                  <div className={styles.scoreBar}>
                    <div className={`${styles.scoreBarFill} ${fillClass(val)}`} style={{ width: `${val}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.doneActions}>
            <button className={styles.bigBtn} onClick={() => {
              setView("setup"); setScores([]); setSessionData(null);
              setResult(null); setTranscript("");
            }}>
              Practice Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default EnglishSpeaking;