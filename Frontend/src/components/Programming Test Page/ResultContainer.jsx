import { useEffect } from "react";
import styles from "./ResultContainer.module.css";
import axios from "../../axios.js";  

function ResultContainer({ result, topic, difficulty }) {

  useEffect(() => {
    const saveResult = async () => {
      const email = localStorage.getItem("email") || localStorage.getItem("userEmail");
      if (!email || !result) return;

      try {
        await fetch("http://localhost:5000/api/results/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            featureType: "programming",
            topic:       topic      || "General",
            difficulty:  difficulty || "Medium",
            correct:     result.correct,
            wrong:       result.wrong,
            percentage:  parseFloat(result.percentage),
          }),
        });
      } catch (err) {
        console.error("Result save error:", err);
      }
    };

    saveResult();
  }, []);

  return (
    <div className={styles.bodyContainer}>
      <div className={styles.ResultContainer}>
        <h2 className={styles.ResultTitle}>Test Result</h2>

        <div className={styles.ScoreBox}>
          <p>Correct Answers</p>
          <span>{result.correct}</span>
        </div>

        <div className={styles.ScoreBox}>
          <p>Wrong Answers</p>
          <span>{result.wrong}</span>
        </div>

        <div className={styles.ScoreBox}>
          <p>Score</p>
          <span>{result.percentage}%</span>
        </div>

        <button
          className={styles.RestartButton}
          onClick={() => window.location.reload()}
        >
          Start New Test
        </button>
      </div>
    </div>
  );
}

export default ResultContainer;