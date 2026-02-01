import styles from "./About.module.css";
import { Link } from "react-router-dom";
function AboutUs() {
  return (
    <div className={styles.container}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>About Us</h1>
        <p>
We are Here To Solve Fresher Placement Related All Problems Our Site Give The Best Resources And Solution.
        </p>
         <Link className={styles.styledLink} to="/home">Home</Link>
      </section>

      {/* INTRO */}
      <section className={styles.intro}>
        <h2>Building Digital Experiences That Matter</h2>
        <p>
          We believe great software is built at the intersection of
          clean design, solid engineering, and real user needs.
          Our focus is on simplicity, performance, and scalability.
        </p>
      </section>

      {/* CORE SECTIONS */}
      <section className={styles.cardsSection}>
        <div className={styles.card}>
          <h3>Who We Are</h3>
          <p>
We are a skill-focused training and placement platform dedicated to preparing students for real industry roles through structured learning, hands-on projects, and continuous mentorship.
          </p>
        </div>

        <div className={styles.card}>
          <h3>What We Do</h3>
          <p>
We provide industry-oriented training, real-world projects, and interview preparation to bridge the gap between academics and professional requirements.
          </p>
        </div>

        <div className={styles.card}>
          <h3>Our Mission</h3>
          <p>
Our mission is to make students job-ready by strengthening their technical skills, problem-solving ability, and confidence.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className={styles.values}>
        <h2>Our Core Values</h2>
        <div className={styles.valuesGrid}>
          <div>💡 Innovation</div>
          <div>⚡ Performance</div>
          <div>🎯 Quality</div>
          <div>🤝 Collaboration</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <h3>Placement Mantra</h3>
          <p>
           Intrested To Solve Stdudents Problem And Collabrate To World Peace.
          </p>
        </div>

        <div className={styles.footerBottom}>
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </footer>

    </div>
  );
}

export default AboutUs;
