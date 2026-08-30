import React from 'react';
import styles from './ResumeHero.module.css';

const ResumeHero = () => {
  const handleComingSoon = () => {
    alert("This Feature is coming soon 🚀");
  };

  return (
    <section className={styles.heroContainer}>
      {/* Background Ambient Glow */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.heroContent}>
        {/* Main Heading */}
        <h1 className={styles.heading}>
          Craft a Resume That <br className={styles.desktopBreak} />
          <span className={styles.gradientText}>Gets You Hired</span>
        </h1>

        {/* Supporting Description */}
        <p className={styles.description}>
          Don't let rigid formatting hold you back. Use our smart editor to build a resume 
          packed with high-relevance keywords tailored for top ATS filters.
        </p>

        {/* Primary CTA Button */}
        <div className={styles.ctaWrapper}>
          <button className={styles.primaryButton} onClick={handleComingSoon}>
            Craft Your Resume Now
            <span className={styles.arrowIcon}>→</span>
          </button>
        </div>

        {/* Trust/Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>ATS Compliant</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>5 Mins</div>
            <div className={styles.statLabel}>Avg. Build Time</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>Free</div>
            <div className={styles.statLabel}>Premium Templates</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeHero;