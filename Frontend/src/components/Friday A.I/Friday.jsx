import styles from "./Friday.module.css";
function Friday() {
  return (
    <div className={styles.wrapper}>

      <div className={styles.message}>
        May I Help You
      </div>

      <div className={styles.helpCircle}>
        <a
          href="/help"          // 👉 apna link yahan
          target="_blank"       // same tab chahiye to hata do
          rel="noreferrer"
        >
          <img
            src="/images/ChatBotPicture.avif"
            alt="Help"
            className={styles.helpImage}
          />
        </a>
      </div>

    </div>
  );
}

export default Friday;

