import { useEffect, useState } from "react";
import styles from "./Loader.module.css";

const STEPS = [
  "Extracting resume text...",
  "Parsing job description...",
  "Cross-referencing keywords...",
  "Scoring ATS compatibility...",
  "Compiling suggestions...",
];

function Loader() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((i) => (i + 1) % STEPS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.radar}>
        <div className={styles.radarSweep} />
        <div className={styles.radarRing} />
        <div className={styles.radarRing2} />
      </div>
      <p className={styles.stepText}>{STEPS[stepIndex]}</p>
    </div>
  );
}

export default Loader;
