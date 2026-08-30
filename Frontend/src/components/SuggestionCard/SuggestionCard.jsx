import styles from "./SuggestionCard.module.css";

const PRIORITY_LABEL = {
  high: "HIGH",
  medium: "MED",
  low: "LOW",
};

function SuggestionCard({ priority = "medium", issue, fix, index }) {
  return (
    <div className={`${styles.card} ${styles[priority]}`}>
      <div className={styles.top}>
        <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
        <span className={styles.priorityBadge}>{PRIORITY_LABEL[priority]}</span>
      </div>
      <p className={styles.issue}>{issue}</p>
      <p className={styles.fix}>
        <span className={styles.fixLabel}>Fix →</span> {fix}
      </p>
    </div>
  );
}

export default SuggestionCard;
