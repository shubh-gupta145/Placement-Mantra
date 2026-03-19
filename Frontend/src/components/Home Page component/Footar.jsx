import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={styles.footer}
    >
      <div className={styles.grid}>

        {/* Logo / Brand */}
        <div className={styles.brand}>
          <h1 className={styles.logo}>
            PlacementMantra<span className={styles.dot}>.</span>
          </h1>
          <p className={styles.tagline}>
            We are here To Solve All Your Placement Related Problems.
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles.links}>
          <h2 className={styles.heading}>Quick Links</h2>
          <Link className={styles.link} to="/">Home</Link>
          <Link className={styles.link} to="/MockInterFace">Mocks</Link>
          <Link className={styles.link} to="/CGPA">CGPA</Link>
          <Link className={styles.link} to="/TestInterFace">Tests</Link>
        </div>

        {/* Social Icons */}
        <div className={styles.social}>
          <h2 className={styles.heading}>Follow Us</h2>
          <div className={styles.icons}>
            {[FaGithub, FaLinkedin, FaInstagram, FaGlobe].map((Icon, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={styles.icon}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

      </div>

      <hr className={styles.divider} />

      <p className={styles.copyright}>
        © {new Date().getFullYear()} ResumeBuilder. All rights reserved.
      </p>
    </motion.footer>
  );
}

export default Footer;