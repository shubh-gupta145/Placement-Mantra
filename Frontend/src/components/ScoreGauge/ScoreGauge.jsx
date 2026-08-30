import { useEffect, useState } from "react";
import styles from "./ScoreGauge.module.css";

function getScoreColor(score) {
  if (score >= 70) return "var(--accent-green)";
  if (score >= 40) return "var(--accent-amber)";
  return "var(--accent-red)";
}

function ScoreGauge({ score, verdict }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = 88;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    setAnimatedScore(0);
    const timeout = setTimeout(() => setAnimatedScore(score), 100);
    return () => clearTimeout(timeout);
  }, [score]);

  const offset = circumference - (animatedScore / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className={styles.wrapper}>
      <svg viewBox="0 0 200 200" className={styles.svg}>
        <circle
          cx="100"
          cy="100"
          r={radius}
          className={styles.trackCircle}
          strokeWidth="10"
        />
        <circle
          cx="100"
          cy="100"
          r={radius}
          strokeWidth="10"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={styles.progressCircle}
          transform="rotate(-90 100 100)"
        />
      </svg>

      <div className={styles.center}>
        <span className={styles.scoreNumber} style={{ color }}>
          {animatedScore}
          <span className={styles.percentSign}>%</span>
        </span>
        <span className={styles.scoreLabel}>MATCH</span>
      </div>

      {verdict && (
        <div className={styles.verdictBadge} style={{ borderColor: color, color }}>
          {verdict}
        </div>
      )}
    </div>
  );
}

export default ScoreGauge;
