import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { analyzeInterview, SCORE_CATEGORIES } from "../../../data/answerAnalyzer.js";
import styles from "./InterviewResult.module.css";
import {
  MdCheckCircle,
  MdWarning,
  MdTrendingUp,
  MdReplay,
  MdHome,
  MdExpandMore,
  MdExpandLess,
  MdAutoAwesome,
} from "react-icons/md";

function InterviewResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    qaLog = [],
    role = "",
    timing = 2,
    userName = "Candidate",
    reason = "completed",
  } = location.state || {};

  const [result, setResult] = useState(null);
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [animScore, setAnimScore] = useState(0);
  const [ringOffset, setRingOffset] = useState(339);

  const CIRCUMFERENCE = 339; // 2 * π * 54

  useEffect(() => {
    const r = analyzeInterview(qaLog, role, timing);
    setResult(r);

    // Animate score counter
    let count = 0;
    const step = Math.ceil(r.overallScore / 50);
    const interval = setInterval(() => {
      count += step;
      if (count >= r.overallScore) {
        setAnimScore(r.overallScore);
        setRingOffset(CIRCUMFERENCE - (r.overallScore / 100) * CIRCUMFERENCE);
        clearInterval(interval);
      } else {
        setAnimScore(count);
        setRingOffset(CIRCUMFERENCE - (count / 100) * CIRCUMFERENCE);
      }
    }, 25);
    return () => clearInterval(interval);
  }, []);

  if (!result) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Analysing your interview…</p>
      </div>
    );
  }

  const gradeColor = () => {
    if (result.overallScore >= 80) return "#4ade80";
    if (result.overallScore >= 60) return "#facc15";
    if (result.overallScore >= 40) return "#fb923c";
    return "#f87171";
  };

  const gradeChipStyle = () => {
    const c = gradeColor();
    return {
      background: `${c}18`,
      color: c,
      border: `1px solid ${c}40`,
    };
  };

  const barColor = (val) => {
    if (val >= 70) return "linear-gradient(90deg, #22c55e, #4ade80)";
    if (val >= 50) return "linear-gradient(90deg, #d97706, #fbbf24)";
    return "linear-gradient(90deg, #dc2626, #f87171)";
  };

  const pillClass = (score) => {
    if (score >= 70) return styles.pillGood;
    if (score >= 50) return styles.pillMid;
    return styles.pillBad;
  };

  const reasonLabel = {
    completed: "✓ Completed",
    timeout:   "⏱ Time's Up",
    stopped:   "◼ Ended Early",
  }[reason] || "Ended";

  const reasonClass = {
    completed: "",
    timeout:   styles.timeout,
    stopped:   styles.stopped,
  }[reason] || "";

  return (
    <div className={styles.container}>

      {/* ── Hero Banner ──────────────────────────────────────── */}
      <div className={styles.heroBanner}>
        <h1 className={styles.heroTitle}>Interview Report</h1>
        <div className={styles.heroBadgeRow}>
          <span className={`${styles.heroBadge} ${styles.badgeRole}`}>
            👤 {userName}
          </span>
          <span className={`${styles.heroBadge} ${styles.badgeRole}`}>
            💼 {role}
          </span>
          <span className={`${styles.heroBadge} ${styles.badgeTiming}`}>
            ⏱ {timing} min
          </span>
          <span className={`${styles.heroBadge} ${styles.badgeReason} ${reasonClass}`}>
            {reasonLabel}
          </span>
        </div>
      </div>

      <div className={styles.pageBody}>

        {/* ── Score Hero Card ───────────────────────────────── */}
        <div className={styles.scoreHero}>
          {/* SVG Ring */}
          <div className={styles.scoreRingWrapper}>
            <svg className={styles.scoreRingSvg} width="160" height="160" viewBox="0 0 160 160">
              <circle className={styles.scoreRingBg} cx="80" cy="80" r="54" />
              <circle
                className={styles.scoreRingFill}
                cx="80" cy="80" r="54"
                stroke={gradeColor()}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={ringOffset}
                style={{ filter: `drop-shadow(0 0 8px ${gradeColor()}88)` }}
              />
            </svg>
            <div className={styles.scoreTextInside}>
              <span className={styles.scoreNum} style={{ color: gradeColor() }}>
                {animScore}
              </span>
              <span className={styles.scoreOutOf}>/100</span>
            </div>
          </div>

          {/* Grade */}
          <div className={styles.gradeChip} style={gradeChipStyle()}>
            Grade &nbsp;{result.grade}
          </div>

          {/* Summary */}
          <p className={styles.summaryText}>{result.summary}</p>

          {/* Meta chips */}
          <div className={styles.metaChips}>
            <div className={styles.metaChip}>
              <span className={styles.metaChipVal}>{result.answeredCount}</span>
              <span className={styles.metaChipLabel}>Answered</span>
            </div>
            <div className={styles.metaDivider} />
            <div className={styles.metaChip}>
              <span className={styles.metaChipVal}>{result.totalQuestions}</span>
              <span className={styles.metaChipLabel}>Total Q's</span>
            </div>
            <div className={styles.metaDivider} />
            <div className={styles.metaChip}>
              <span className={styles.metaChipVal} style={{ color: "#f87171" }}>
                {result.totalNegativeWords}
              </span>
              <span className={styles.metaChipLabel}>Informal</span>
            </div>
            <div className={styles.metaDivider} />
            <div className={styles.metaChip}>
              <span className={styles.metaChipVal} style={{ color: gradeColor() }}>
                {result.grade}
              </span>
              <span className={styles.metaChipLabel}>Grade</span>
            </div>
          </div>
        </div>

        {/* ── Performance Breakdown ─────────────────────────── */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={`${styles.cardIconBox} ${styles.iconPurple}`}>
              <MdTrendingUp />
            </div>
            <div>
              <p className={styles.cardTitle}>Performance Breakdown</p>
              <p className={styles.cardSubtitle}>Score across 5 key areas</p>
            </div>
          </div>
          <div className={styles.barsGrid}>
            {Object.entries(result.categories).map(([key, val]) => (
              <div key={key} className={styles.barRow}>
                <span className={styles.barLabel}>{SCORE_CATEGORIES[key]}</span>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{ width: `${val}%`, background: barColor(val) }}
                  />
                </div>
                <span className={styles.barValue}>{val}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Strong Points + Improvements ─────────────────── */}
        <div className={styles.twoCol}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIconBox} ${styles.iconGreen}`}>
                <MdCheckCircle />
              </div>
              <div>
                <p className={styles.cardTitle}>Strong Points</p>
                <p className={styles.cardSubtitle}>What you did well</p>
              </div>
            </div>
            <ul className={styles.feedbackList}>
              {result.strongPoints.map((pt, i) => (
                <li key={i} className={`${styles.feedbackItem} ${styles.feedbackItemGood}`}>
                  <span className={`${styles.feedbackDot} ${styles.dotGreen}`} />
                  {pt}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIconBox} ${styles.iconOrange}`}>
                <MdWarning />
              </div>
              <div>
                <p className={styles.cardTitle}>Areas to Improve</p>
                <p className={styles.cardSubtitle}>Focus on these next time</p>
              </div>
            </div>
            <ul className={styles.feedbackList}>
              {result.improvements.map((pt, i) => (
                <li key={i} className={`${styles.feedbackItem} ${styles.feedbackItemWarn}`}>
                  <span className={`${styles.feedbackDot} ${styles.dotOrange}`} />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Detailed Q&A ──────────────────────────────────── */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={`${styles.cardIconBox} ${styles.iconPurple}`}>
              <MdAutoAwesome />
            </div>
            <div>
              <p className={styles.cardTitle}>Question-wise Analysis</p>
              <p className={styles.cardSubtitle}>Click any question to expand</p>
            </div>
          </div>

          <div className={styles.qaList}>
            {result.details.map((item, idx) => (
              <div key={idx} className={styles.qaCard}>
                <div
                  className={styles.qaHeader}
                  onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                >
                  <span className={`${styles.qaScorePill} ${pillClass(item.analysis.score)}`}>
                    {item.analysis.score}
                  </span>
                  <span className={styles.qaQuestionText}>
                    Q{idx + 1}. {item.question}
                  </span>
                  <span className={`${styles.qaChevron} ${expandedIdx === idx ? styles.qaChevronOpen : ""}`}>
                    <MdExpandMore />
                  </span>
                </div>

                {expandedIdx === idx && (
                  <div className={styles.qaBody}>
                    {/* Answer */}
                    <div className={styles.answerSection}>
                      <div className={styles.answerMeta}>
                        <span className={styles.answerLabel}>Your Answer</span>
                        <span className={styles.wordCountBadge}>
                          {item.analysis.wordCount} words
                        </span>
                      </div>
                      {item.answer?.trim() ? (
                        <p className={styles.answerText}>{item.answer}</p>
                      ) : (
                        <p className={styles.noAnswerText}>No answer recorded.</p>
                      )}
                    </div>

                    {/* AI Feedback */}
                    <div className={styles.aiFeedbackBox}>
                      <span className={styles.aiFeedbackIcon}>💡</span>
                      <p className={styles.aiFeedbackText}>{item.analysis.feedback}</p>
                    </div>

                    {/* Tags */}
                    <div className={styles.tagsArea}>
                      {item.analysis.negativeWords.length > 0 && (
                        <>
                          <span className={`${styles.tagSectionLabel} ${styles.tagLabelRed}`}>
                            ⚠ Informal:
                          </span>
                          {item.analysis.negativeWords.slice(0, 8).map((w, i) => (
                            <span key={i} className={`${styles.tag} ${styles.tagRed}`}>{w}</span>
                          ))}
                          {item.analysis.positiveWords.length > 0 && (
                            <span className={styles.tagDivider} />
                          )}
                        </>
                      )}
                      {item.analysis.positiveWords.length > 0 && (
                        <>
                          <span className={`${styles.tagSectionLabel} ${styles.tagLabelGreen}`}>
                            ✓ Power words:
                          </span>
                          {item.analysis.positiveWords.slice(0, 6).map((w, i) => (
                            <span key={i} className={`${styles.tag} ${styles.tagGreen}`}>{w}</span>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Action Buttons ────────────────────────────────── */}
        <div className={styles.actionRow}>
          <button className={styles.btnSecondary} onClick={() => navigate("/")}>
            <MdHome /> Home
          </button>
          <button
            className={styles.btnPrimary}
            onClick={() => navigate("/MockInterFace", { state: { role, timing, userName } })}
          >
            <MdReplay /> Try Again
          </button>
        </div>

      </div>
    </div>
  );
}

export default InterviewResult;