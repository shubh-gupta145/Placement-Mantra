import { useState } from "react";
import styles from "./Footer.module.css";

const contactItems = [
  {
    label: "Trams Yamuna Colony Phase-2 Agra",
    iconPath:
      "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  },
  {
    label: "8433052037",
    iconPath:
      "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
  },
  {
    label: "beastboyshubh145@gmail.com",
    iconPath:
      "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  },
];
function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <footer className={styles.footer}>
      {/* Decorative top accent line */}
      <div className={styles.accentLine} />

      <div className={styles.inner}>
        {/* ── TOP GRID ── */}
        <div className={styles.grid}>

          {/* Brand */}
          <div className={styles.brandCol}>
            <h2 className={styles.brandName}>Placement Mantra</h2>
            <p className={styles.brandTag}>
              Curated goods for everyday living.<br />
              Thoughtfully made, carefully chosen.
            </p>
          </div>

          {/* Contact */}
          <div className={styles.contactCol}>
            <p className={styles.colLabel}>Get in touch</p>
            <ul className={styles.contactList}>
              {contactItems.map((item, i) => (
                <li key={i} className={styles.contactItem}>
                  <svg viewBox="0 0 24 24" className={styles.contactIcon}>
                    <path d={item.iconPath} />
                  </svg>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className={styles.aboutCol}>
            <p className={styles.colLabel}>Who we are</p>
            <p className={styles.aboutText}>
Placement Mantra is a smart platform that helps students become job-ready by providing tools like mock interviews, coding tests, and learning resources. Our goal is to simplify placement preparation and support students in building the skills needed for successful careers.
            </p>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>© 2026 Maison & Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;