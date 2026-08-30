import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span className={styles.logoBracket}>[</span>
          RESUME<span className={styles.logoAccent}>::SCAN</span>
          <span className={styles.logoBracket}>]</span>
        </div>

        <div className={styles.status}>
          <span className={styles.pulseDot} />
          <span className={styles.statusText}>ANALYZER ONLINE</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
