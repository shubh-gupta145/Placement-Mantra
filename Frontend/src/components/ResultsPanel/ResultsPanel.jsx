import ScoreGauge from "../ScoreGauge/ScoreGauge";
import SuggestionCard from "../SuggestionCard/SuggestionCard";
import CompanyBadge from "../CompanyBadge/CompanyBadge";
import styles from "./ResultsPanel.module.css";

function TagList({ items, variant }) {
  if (!items || items.length === 0) return <p className={styles.emptyNote}>None found</p>;
  return (
    <div className={styles.tagList}>
      {items.map((item, i) => (
        <span key={i} className={`${styles.tag} ${styles[variant]}`}>
          {item}
        </span>
      ))}
    </div>
  );
}

function BulletList({ items }) {
  if (!items || items.length === 0) return <p className={styles.emptyNote}>Nothing flagged</p>;
  return (
    <ul className={styles.bulletList}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function ResultsPanel({ result, onReset }) {
  const {
    companyName,
    jobTitle,
    resumeFileName,
    matchPercentage,
    verdict,
    matchedSkills,
    missingSkills,
    keywordGaps,
    strengths,
    weaknesses,
    atsFormattingIssues,
    suggestions,
    summary,
  } = result;

  return (
    <div className={styles.wrapper}>
      {/* ── Score Section ── */}
      <section className={styles.scoreSection}>
        <CompanyBadge
          companyName={companyName}
          jobTitle={jobTitle}
          resumeFileName={resumeFileName}
        />
        <ScoreGauge score={matchPercentage} verdict={verdict} />
        {summary && <p className={styles.summary}>{summary}</p>}
      </section>

      {/* ── Skills breakdown ── */}
      <div className={styles.twoCol}>
        <section className={styles.card}>
          <h3 className={styles.cardTitle}>
            <span className={styles.dotGreen} /> Matched Skills
          </h3>
          <TagList items={matchedSkills} variant="green" />
        </section>

        <section className={styles.card}>
          <h3 className={styles.cardTitle}>
            <span className={styles.dotRed} /> Missing Skills
          </h3>
          <TagList items={missingSkills} variant="red" />
        </section>
      </div>

      <div className={styles.twoCol}>
        <section className={styles.card}>
          <h3 className={styles.cardTitle}>
            <span className={styles.dotCyan} /> Strengths
          </h3>
          <BulletList items={strengths} />
        </section>

        <section className={styles.card}>
          <h3 className={styles.cardTitle}>
            <span className={styles.dotAmber} /> Weaknesses
          </h3>
          <BulletList items={weaknesses} />
        </section>
      </div>

      {keywordGaps && keywordGaps.length > 0 && (
        <section className={styles.card}>
          <h3 className={styles.cardTitle}>
            <span className={styles.dotAmber} /> Keyword Gaps
          </h3>
          <TagList items={keywordGaps} variant="amber" />
        </section>
      )}

      {atsFormattingIssues && atsFormattingIssues.length > 0 && (
        <section className={styles.card}>
          <h3 className={styles.cardTitle}>
            <span className={styles.dotRed} /> ATS Formatting Issues
          </h3>
          <BulletList items={atsFormattingIssues} />
        </section>
      )}

      {/* ── Suggestions ── */}
      {suggestions && suggestions.length > 0 && (
        <section className={styles.suggestionsSection}>
          <h3 className={styles.suggestionsTitle}>Improvement Suggestions</h3>
          <div className={styles.suggestionsGrid}>
            {suggestions.map((s, i) => (
              <SuggestionCard key={i} index={i} priority={s.priority} issue={s.issue} fix={s.fix} />
            ))}
          </div>
        </section>
      )}

      <button className={styles.resetBtn} onClick={onReset}>
        ← Run Another Scan
      </button>
    </div>
  );
}

export default ResultsPanel;
