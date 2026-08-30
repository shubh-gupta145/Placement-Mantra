import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        Resume::Scan analyzes structure &amp; keyword alignment — it estimates ATS
        shortlisting odds, it doesn't guarantee outcomes.
      </p>
    </footer>
  );
}

export default Footer;
