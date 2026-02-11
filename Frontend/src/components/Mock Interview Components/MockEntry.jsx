import styles from "./MockEntry.module.css";
import { Link } from "react-router-dom";
function MockEntry() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Explore Our Mock Interviews</h1>

        <p className={styles.description}>
          Prepare with real-world mock interviews designed by industry experts.
          Boost your confidence, improve communication skills, and get job-ready
          with personalized interview experiences.
        </p>

        <button className={styles.btn}>        
            <Link  className={styles.links} to="/MockInterview">Get Started 🚀</Link>
            </button>
      </div>
    </div>
  );
}

export default MockEntry;
