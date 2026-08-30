import styles from "./CompanyBadge.module.css";

function CompanyBadge({ companyName, jobTitle, resumeFileName }) {
  return (
    <div className={styles.badge}>
      <div className={styles.line}>
        <span className={styles.dot} />
        <span className={styles.company}>{companyName}</span>
        {jobTitle && <span className={styles.title}> · {jobTitle}</span>}
      </div>
      <span className={styles.file}>{resumeFileName}</span>
    </div>
  );
}

export default CompanyBadge;
