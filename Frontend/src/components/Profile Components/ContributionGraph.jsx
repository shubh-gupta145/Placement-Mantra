import { useEffect, useState } from "react";
import styles from "./ContributionGraph.module.css";

const weeks = 52;
const days = 7;

function ContributionGraph({ isLoggedIn }) {
  const [activeMinutes, setActiveMinutes] = useState(0);

  useEffect(() => {
    if (!isLoggedIn) {
      setActiveMinutes(0);
      return;
    }

    const startTime = Date.now();

    const timer = setInterval(() => {
      const diff = Math.floor((Date.now() - startTime) / 60000);
      setActiveMinutes(diff);
    }, 60000);

    return () => clearInterval(timer);
  }, [isLoggedIn]);

  // activity level logic
  const getLevel = () => {
    if (!isLoggedIn || activeMinutes < 1) return 0;        // black
    if (activeMinutes >= 60) return 3;                     // dark green
    if (activeMinutes >= 15) return 2;                     // light green
    return 1;                                              // very low
  };

  const level = getLevel();

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        Active Time: {activeMinutes} minutes
      </h3>

      <div className={styles.graph}>
        {Array.from({ length: weeks }).map((_, week) => (
          <div key={week} className={styles.column}>
            {Array.from({ length: days }).map((_, day) => (
              <div
                key={day}
                className={`${styles.cell} ${styles[`level${level}`]}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContributionGraph;
