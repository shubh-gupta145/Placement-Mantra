import { useState, useRef, useEffect } from "react";
import styles from "./SkillsBtn.module.css";
import axios from "../../axios.js";    
const SWIPE_THRESHOLD = 50; // itne pixels swipe pe hi open/close hoga

function SkillsBtn({ setSelectedSkill }) {
  // ✅ Page load pe auto-open (mobile pe slide-in, desktop pe normal visible)
  const [isOpen, setIsOpen] = useState(true);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleSelect = (skill) => {
    setSelectedSkill(skill);
    // ✅ Sirf mobile pe auto-close — select karte hi sidebar left mein chip jata hai
    if (window.innerWidth <= 600) {
      setIsOpen(false);
    }
  };

  // ── Sidebar ke andar swipe (khula hone par left-swipe se band karna) ──
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (window.innerWidth > 600) return;
    const diff = touchEndX.current - touchStartX.current;
    if (isOpen && diff < -SWIPE_THRESHOLD) {
      setIsOpen(false);
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // ── Window-level listener — sidebar band hone par left-edge se right-swipe karke kholna ──
  useEffect(() => {
    if (window.innerWidth > 600) return;

    let startX = 0;
    const handleStart = (e) => { startX = e.touches[0].clientX; };
    const handleEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      // Edge ke paas se (40px) shuru hua right-swipe hi count hoga,
      // taaki normal page-scroll accidentally sidebar na khol de
      if (!isOpen && diff > SWIPE_THRESHOLD && startX < 40) {
        setIsOpen(true);
      }
    };

    window.addEventListener("touchstart", handleStart);
    window.addEventListener("touchend", handleEnd);
    return () => {
      window.removeEventListener("touchstart", handleStart);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`${styles.SkillsContainer} ${
          isOpen ? styles.SkillsOpen : styles.SkillsClosed
        }`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <button
          className={styles.ToggleHeader}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
        >
          <span>Select Job Role</span>
          <span className={`${styles.Arrow} ${isOpen ? styles.ArrowOpen : ""}`}>
            ▾
          </span>
        </button>

        <div className={styles.SkillGrid}>
          <div className={styles.Skill} onClick={() => handleSelect("frontend")}>Frontend Developer</div>
          <div className={styles.Skill} onClick={() => handleSelect("backend")}>Backend Developer</div>
          <div className={styles.Skill} onClick={() => handleSelect("fullstack")}>Full Stack Developer</div>
          <div className={styles.Skill} onClick={() => handleSelect("ai")}>AI Developer</div>
          <div className={styles.Skill} onClick={() => handleSelect("ml")}>ML Developer</div>
          <div className={styles.Skill} onClick={() => handleSelect("datascientist")}>Data Scientist</div>
          <div className={styles.Skill} onClick={() => handleSelect("dataanalysis")}>Data Analysis</div>
          <div className={styles.Skill} onClick={() => handleSelect("hacker")}>Hacker</div>
          <div className={styles.Skill} onClick={() => handleSelect("cloud")}>Cloud Engineer</div>
          <div className={styles.Skill} onClick={() => handleSelect("ui")}>UI Designer</div>
          <div className={styles.Skill} onClick={() => handleSelect("python")}>Python Developer</div>
          <div className={styles.Skill} onClick={() => handleSelect("java")}>Java Developer</div>
        </div>
      </div>

      {/* ── Edge handle — sirf mobile pe dikhega, sidebar band hone par ── */}
      <button
        className={`${styles.EdgeHandle} ${isOpen ? styles.EdgeHandleHidden : ""}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open job roles"
      >
        ▸
      </button>

      {/* ── Overlay — mobile pe sidebar khula ho to background dim, tap-to-close ── */}
      {isOpen && (
        <div
          className={styles.Overlay}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default SkillsBtn;