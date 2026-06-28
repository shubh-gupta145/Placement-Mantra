import { useState, useEffect, useCallback } from "react";
import styles from "./TestPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import ResultContainer from "./ResultContainer";
import useFeatureTrack from '../../utils/useFeatureTrack';

const SECONDS_PER_QUESTION = 30;

// ── Difficulty-wise 50-50 lifeline limits ──
const LIFELINE_LIMITS = {
  Easy: 3,
  Medium: 2,
  Hard: 0,
};

function TestPage() {
  useFeatureTrack('test-page');

  const location  = useLocation();
  const navigate  = useNavigate();

  // location.state can be either a plain array (old behavior)
  // or { questions, difficulty } — both supported
  const questions  = Array.isArray(location.state)
    ? location.state
    : location.state?.questions || [];
  const difficulty = Array.isArray(location.state)
    ? "Medium"
    : location.state?.difficulty || "Medium";

  const maxLifelines = LIFELINE_LIMITS[difficulty] ?? 2;

  const [current,        setCurrent]        = useState(0);
  const [selected,       setSelected]       = useState(null);
  const [answers,        setAnswers]        = useState({});
  const [result,         setResult]         = useState(null);
  const [showResult,     setShowResult]     = useState(false);
  const [timeLeft,       setTimeLeft]       = useState(SECONDS_PER_QUESTION);
  const [eliminated,     setEliminated]     = useState([]);
  const [lifelineCount,  setLifelineCount]  = useState(maxLifelines);
  const [locked,         setLocked]         = useState(false);
  const [showQuitModal,  setShowQuitModal]  = useState(false);

  // ── Submit ──
  const submitTest = useCallback(() => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });
    const wrong      = questions.length - correct;
    const percentage = ((correct / questions.length) * 100).toFixed(2);
    setResult({ correct, wrong, percentage });
    setShowResult(true);
  }, [answers, questions]);

  // ── Timer ──
  useEffect(() => {
    if (showResult) return;
    setTimeLeft(SECONDS_PER_QUESTION);
    setLocked(false);
    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(id);
          setLocked(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [current, showResult]);

  // ── Warn before leaving (tab close / refresh) ──
  useEffect(() => {
    if (showResult) return;
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [showResult]);

  // ── Warn before leaving (browser back button) ──
  useEffect(() => {
    if (showResult) return;

    // Push a dummy state so back button triggers popstate first
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      // Push state again to "cancel" the back navigation visually
      window.history.pushState(null, "", window.location.href);
      setShowQuitModal(true);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [showResult]);

  const confirmQuit = () => {
    setShowQuitModal(false);
    navigate(-2); // -1 was our dummy pushState, -2 = actual previous page
  };

  const cancelQuit = () => {
    setShowQuitModal(false);
  };

  if (questions.length === 0) return <h2 style={{ color: "#fff", textAlign: "center", marginTop: "40vh" }}>No Questions Found</h2>;

  // ── Handlers ──
  const handleOption = (index) => {
    if (eliminated.includes(index)) return;
    if (locked) return;
    setSelected(index);
    setAnswers({ ...answers, [current]: index });
  };

  const nextQuestion = () => {
    if (selected === null && !locked) return;
    if (current < questions.length - 1) {
      const next = current + 1;
      setCurrent(next);
      setSelected(answers[next] ?? null);
      setEliminated([]);
    } else {
      submitTest();
    }
  };

  const use5050 = () => {
    if (lifelineCount <= 0 || selected !== null) return;
    const correctIdx = questions[current].answer;
    const wrong = questions[current].options
      .map((_, i) => i)
      .filter(i => i !== correctIdx);
    const toElim = wrong.sort(() => Math.random() - 0.5).slice(0, 2);
    setEliminated(toElim);
    setLifelineCount(c => c - 1);
  };

  const answered   = Object.keys(answers).length;
  const progress   = ((current) / questions.length) * 100;
  const timerPct   = (timeLeft / SECONDS_PER_QUESTION) * 100;
  const timerColor = timeLeft > 15 ? "#00bcbc" : timeLeft > 7 ? "#f59e0b" : "#ef4444";
  const isCritical = timeLeft <= 10 && timeLeft > 0;

  if (showResult) return <ResultContainer result={result} />;

  return (
    <div className={styles.bodyContainer}>

      {/* ── Main ── */}
      <div className={styles.wrapper}>

        {/* Top Bar */}
        <div className={styles.topBar}>
          <div className={styles.topCenter}>
            <span className={styles.qCounter}>{current + 1} / {questions.length}</span>
            <span className={styles.answeredBadge}>{answered} answered</span>
          </div>

          <div className={styles.topActions}>
            {/* 50-50 Lifeline */}
            <button
              className={`${styles.lifelineBtn} ${lifelineCount === 0 ? styles.lifelineUsed : ""}`}
              onClick={use5050}
              title={maxLifelines === 0 ? "Not available on Hard difficulty" : "50-50 Lifeline"}
              disabled={lifelineCount <= 0 || selected !== null}
            >
              50•50 {maxLifelines > 0 && `(${lifelineCount})`}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>

        {/* Main Card */}
        <div className={styles.card}>

          {/* Timer ring */}
          <div className={`${styles.timerWrap} ${isCritical ? styles.timerCritical : ""}`}>
            <svg className={styles.timerSvg} viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
              <circle
                cx="22" cy="22" r="18" fill="none"
                stroke={timerColor}
                strokeWidth="3"
                strokeDasharray={`${2 * Math.PI * 18}`}
                strokeDashoffset={`${2 * Math.PI * 18 * (1 - timerPct / 100)}`}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s", transform: "rotate(-90deg)", transformOrigin: "center" }}
              />
            </svg>
            <span className={styles.timerNum} style={{ color: timerColor }}>{timeLeft}</span>
          </div>

          {/* Question */}
          <div className={styles.questionBox}>
            <span className={styles.qLabel}>Q{current + 1}</span>
            <p className={styles.qText}>{questions[current].question}</p>
          </div>

          {/* Options */}
          <div className={styles.optionsGrid}>
            {questions[current].options.map((opt, i) => {
              const isElim     = eliminated.includes(i);
              const isSelected = selected === i;
              return (
                <div
                  key={i}
                  className={`${styles.option}
                    ${isSelected ? styles.optionSelected : ""}
                    ${isElim    ? styles.optionElim    : ""}
                  `}
                  onClick={() => handleOption(i)}
                >
                  <span className={styles.optLabel}>
                    {["A", "B", "C", "D"][i]}
                  </span>
                  <span className={styles.optText}>{opt}</span>
                  {isElim && <span className={styles.elimX}>✕</span>}
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className={styles.navRow}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px", width: "100%" }}>
              {selected === null && !locked && (
                <span style={{ fontSize: "11px", color: "#f59e0b" }}>
                  ⚠ Please select an option
                </span>
              )}
              {locked && selected === null && (
                <span style={{ fontSize: "11px", color: "#ef4444" }}>
                  ⏰ Time up! Moving to next...
                </span>
              )}
              <button
                className={`${styles.nextBtn} ${current === questions.length - 1 ? styles.submitBtn : ""}`}
                onClick={nextQuestion}
                disabled={selected === null && !locked}
              >
                {current === questions.length - 1 ? "Submit Test 🎯" : "Next →"}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── Quit Confirmation Modal ── */}
      {showQuitModal && (
        <div className={styles.quitOverlay}>
          <div className={styles.quitModal}>
            <h3>⚠ Leave Test?</h3>
            <p>Are you sure you want to quit? Your progress will be lost and this attempt won't be saved.</p>
            <div className={styles.quitActions}>
              <button className={styles.quitCancelBtn} onClick={cancelQuit}>Stay on Test</button>
              <button className={styles.quitConfirmBtn} onClick={confirmQuit}>Quit Test</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestPage;