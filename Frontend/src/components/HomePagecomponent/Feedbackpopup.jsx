import { useState, useEffect, useCallback } from "react";
import styles from "./FeedbackPopup.module.css";
import Feedback from "../Admin Panel/Feedback/FeedbackForm"; // ✅ apna form import

// ── Constants ──────────────────────────────────────────
const STORAGE_KEY = "pm_feedback_submitted";
const SNOOZE_KEY  = "pm_feedback_snoozed";
const SNOOZE_MS   = 20 * 60 * 1000; // 20 minutes

// ── Helper ─────────────────────────────────────────────
function shouldShow() {
  if (localStorage.getItem(STORAGE_KEY) === "true") return false;
  const snoozed = localStorage.getItem(SNOOZE_KEY);
  if (snoozed && Date.now() - parseInt(snoozed, 10) < SNOOZE_MS) return false;
  return true;
}

// ── Main Component ─────────────────────────────────────
export default function FeedbackPopup({ currentFeature = "general" }) {
  const [phase, setPhase]     = useState("hidden"); // hidden | prompt | form | thanks
  const [visible, setVisible] = useState(false);

  // Show prompt when component mounts / feature changes
  useEffect(() => {
    if (!shouldShow()) return;
    const timer = setTimeout(() => {
      setPhase("prompt");
      requestAnimationFrame(() => setVisible(true));
    }, 1200);
    return () => clearTimeout(timer);
  }, [currentFeature]);

  // Animate in whenever phase changes (except hidden)
  useEffect(() => {
    if (phase !== "hidden") {
      requestAnimationFrame(() => setVisible(true));
    }
  }, [phase]);

  const dismiss = useCallback((withSnooze = true) => {
    setVisible(false);
    setTimeout(() => setPhase("hidden"), 320);
    if (withSnooze) localStorage.setItem(SNOOZE_KEY, Date.now().toString());
  }, []);

  const handleYes = () => {
    setVisible(false);
    setTimeout(() => setPhase("form"), 200);
  };

  const handleNo = () => dismiss(true);

  // ✅ Feedback.jsx submit hone par yeh call hoga
  const handleFeedbackSubmitted = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
    setTimeout(() => setPhase("thanks"), 200);
    setTimeout(() => dismiss(false), 3000);
  }, [dismiss]);

  if (phase === "hidden") return null;

  return (
    <>
      {/* Backdrop */}
      {(phase === "form" || phase === "thanks") && (
        <div
          className={`${styles.backdrop} ${visible ? styles.backdropIn : ""}`}
          onClick={() => dismiss(true)}
        />
      )}

      {/* ── PROMPT TOAST ── */}
      {phase === "prompt" && (
        <div className={`${styles.toast} ${visible ? styles.toastIn : ""}`}>
          <div className={styles.toastGlow} />
          <div className={styles.toastIcon}>💬</div>
          <div className={styles.toastBody}>
            <p className={styles.toastTitle}>Enjoying Placement Mantra?</p>
            <p className={styles.toastSub}>Share your experience — it only takes 30 sec!</p>
          </div>
          <div className={styles.toastActions}>
            <button className={styles.btnYes} onClick={handleYes}>Yes, sure!</button>
            <button className={styles.btnNo}  onClick={handleNo}>Not now</button>
          </div>
          <button className={styles.toastClose} onClick={() => dismiss(true)} aria-label="Close">✕</button>
        </div>
      )}

      {/* ── FEEDBACK FORM MODAL — apna Feedback.jsx render ho raha hai ── */}
      {phase === "form" && (
        <div
          className={`${styles.modalWrapper} ${visible ? styles.modalWrapperIn : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalGlow} />
          <button
            className={styles.floatingClose}
            onClick={() => dismiss(true)}
            aria-label="Close"
          >
            ✕
          </button>
          <Feedback onSubmitSuccess={handleFeedbackSubmitted} />
        </div>
      )}

      {/* ── THANKS STATE ── */}
      {phase === "thanks" && (
        <div className={`${styles.modal} ${styles.thanksModal} ${visible ? styles.modalIn : ""}`}>
          <div className={styles.modalGlow} />
          <div className={styles.thanksContent}>
            <div className={styles.thanksEmoji}>🎉</div>
            <h2 className={styles.thanksTitle}>Thank you!</h2>
            <p className={styles.thanksSub}>Your feedback helps us build a better Placement Mantra.</p>
            <div className={styles.thanksBar}>
              <div className={styles.thanksBarFill} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}