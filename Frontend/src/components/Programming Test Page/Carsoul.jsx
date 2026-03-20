import { useState } from "react";
import styles from "./Carsoul.module.css";

function HeroCarousel() {

  // ── Test form pe scroll karo ──
  const handleStartTest = () => {
    const testForm = document.getElementById('test-form-section');
    if (testForm) {
      testForm.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.slide}>
        <div className={styles.left}>
          <h1>Let's Crack Programming Together</h1>
          <p>
            Practice real placement level coding questions and improve
            your problem solving skills step by step.
          </p>

          {/* ✅ onClick add kiya */}
          <button className={styles.btn} onClick={handleStartTest}>
            Start Test
          </button>
        </div>

        <div className={styles.right}>
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            alt="Programming"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroCarousel;