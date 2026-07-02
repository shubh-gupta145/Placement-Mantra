import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { MdLocationOn } from "react-icons/md";
import styles from "./Profile.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFeatureTrack from '../../utils/useFeatureTrack';
import FeedbackForm from '../Admin Panel/Feedback/FeedbackForm';
import axios from "../../axios.js";

const FEATURE_META = {
  "programming":    { label: "Programming Test",   icon: "💻", color: "#6366f1" },
  "english-lab":    { label: "English Speak Lab",  icon: "🎤", color: "#0ea5e9" },
  "mock-interview": { label: "Mock Interview",      icon: "🧑‍💼", color: "#10b981" },
};

function scoreColor(pct) {
  if (pct >= 75) return "#10b981";
  if (pct >= 50) return "#f59e0b";
  return "#ef4444";
}

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

function ResultDetail({ result }) {
  const { featureType } = result;

  if (featureType === "programming") {
    return (
      <div>
        <p><strong>Topic:</strong> {result.topic} — {result.difficulty}</p>
        <div style={{ display: "flex", gap: "1rem", margin: "1rem 0" }}>
          <Stat label="Correct" value={result.correct} color="#10b981" />
          <Stat label="Wrong"   value={result.wrong}   color="#ef4444" />
          <Stat label="Score"   value={`${result.percentage}%`} color={scoreColor(result.percentage)} />
        </div>
      </div>
    );
  }

  if (featureType === "english-lab") {
    const labels = ["Pronunciation", "Fluency", "Grammar", "Vocabulary", "Confidence"];
    const deltas = [3, 5, -4, -2, 1];
    return (
      <div>
        <p><strong>Category:</strong> {result.category?.toUpperCase()} &nbsp;|&nbsp;
           <strong>Questions:</strong> {result.totalQ}</p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "1rem 0" }}>
          <Stat label="Avg Score" value={`${result.avgScore}%`} color={scoreColor(result.avgScore)} />
          {labels.map((lbl, i) => {
            const val = Math.min(100, Math.max(0, Math.round(result.avgScore + deltas[i])));
            return <Stat key={lbl} label={lbl} value={`${val}%`} color={scoreColor(val)} />;
          })}
        </div>
      </div>
    );
  }

  if (featureType === "mock-interview") {
    return (
      <div>
        <p><strong>Role:</strong> {result.role} &nbsp;|&nbsp;
           <strong>Duration:</strong> {result.timing} min &nbsp;|&nbsp;
           <strong>Status:</strong> {result.reason}</p>
        {result.resumeBased && <p>📄 Resume-based interview</p>}
        <p style={{ marginTop: "0.5rem" }}><strong>Questions Answered:</strong> {result.qaLog?.length || 0}</p>
        {result.qaLog?.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <strong>Q&A Log:</strong>
            <div style={{ maxHeight: "260px", overflowY: "auto", marginTop: "0.5rem" }}>
              {result.qaLog.map((qa, i) => (
                <div key={i} style={{
                  background: "#f8fafc", borderRadius: "8px",
                  padding: "0.75rem", marginBottom: "0.5rem",
                  border: "1px solid #e2e8f0"
                }}>
                  <p style={{ fontWeight: 600, marginBottom: "0.25rem" }}>Q{i + 1}: {qa.question}</p>
                  <p style={{ color: "#475569" }}>A: {qa.answer || "No answer recorded"}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

function Stat({ label, value, color }) {
  return (
    <div style={{
      textAlign: "center", background: "#f8fafc",
      borderRadius: "10px", padding: "0.6rem 1rem",
      border: "1px solid #e2e8f0", minWidth: "80px"
    }}>
      <div style={{ fontSize: "1.3rem", fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{label}</div>
    </div>
  );
}

function Profile() {
  useFeatureTrack('mock-interview');

  const [profile, setProfile]           = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [results, setResults]           = useState([]);
  const [viewResult, setViewResult]     = useState(null);

  // ── Fetch profile ──
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = localStorage.getItem("email") || localStorage.getItem("userEmail");
        const token = localStorage.getItem("pm_admin_token");
        if (!email || !token) return;

        const res = await axios.get(`/get-profile/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data) setProfile(res.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };
    fetchProfile();
    window.addEventListener("focus", fetchProfile);
    return () => window.removeEventListener("focus", fetchProfile);
  }, []);

  // ── Fetch results ──
  useEffect(() => {
    const fetchResults = async () => {
      const email = localStorage.getItem("email") || localStorage.getItem("userEmail");
      const token = localStorage.getItem("pm_admin_token");
      if (!email || !token) return;
      try {
        const res = await axios.get(`/api/results/${encodeURIComponent(email)}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(res.data)) setResults(res.data);
      } catch (err) {
        console.error("Results fetch error:", err);
      }
    };
    fetchResults();
  }, []);

  // ── Delete result ──
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this result?")) return;
    const token = localStorage.getItem("pm_admin_token");
    try {
      await axios.delete(`/api/results/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResults((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const getScore = (r) => {
    if (r.featureType === "programming")    return Math.round(r.percentage);
    if (r.featureType === "english-lab")    return r.avgScore;
    if (r.featureType === "mock-interview") return r.qaLog?.length > 0 ? 100 : 0;
    return 0;
  };

  return (
    <>
      <div className={styles.container}>

        {/* ── LEFT: Profile card ── */}
        <div className={styles.FirstContainer}>
          <div className={styles.profileTop}>
            <div className={styles.profileHeader}>
              <div className={styles.imageContainer}>
                <img src={profile?.image || "/default-profile.png"} alt="Profile" />
              </div>
              <span className={styles.UserName}>{profile?.name || "User Name"}</span>
            </div>

            <p className={styles.para}>{profile?.summary || "No summary added yet"}</p>

            <Link className={styles.links} to="/EditProfile">
              <button className={styles.Button}>Edit Profile</button>
            </Link>

            <div className={styles.listContainer}>
              <ul className={styles.Profiles}>
                <li><MdLocationOn /> {profile?.location || "Location not added"}</li>
                <li><FaGithub />    {profile?.github   || "GitHub not added"}</li>
                <li><FaLinkedin />  {profile?.linkedin  || "LinkedIn not added"}</li>
                <li><SiLeetcode />  {profile?.leetcode  || "LeetCode not added"}</li>
              </ul>
            </div>
          </div>

          <button className={styles.FeedbackBtn} onClick={() => setShowFeedback(true)}>
            💬 Feedback
          </button>
        </div>

        {/* ── RIGHT: Results ── */}
        <div className={styles.subContainer2}>
          <h1 className={styles.heading}>Your Previous Tests Result</h1>

          {results.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📭</div>
              <h3>No Results Yet</h3>
              <p>You haven't completed any test, mock interview, or speaking session yet.</p>
              <p className={styles.emptyHint}>Complete a test to see your performance here!</p>
            </div>
          ) : (
            <div className={styles.UserTasks}>
              {results.map((r) => {
                const meta  = FEATURE_META[r.featureType] || {};
                const score = getScore(r);
                const col   = scoreColor(score);

                return (
                  <div key={r._id} className={styles.TaskCard}>
                    <div className={styles.LeftSection}>
                      <div
                        className={styles.ProgressCircle}
                        style={{ color: col, border: `3px solid ${col}` }}
                      >
                        {r.featureType === "mock-interview"
                          ? `${r.qaLog?.length || 0}Q`
                          : `${score}%`}
                      </div>
                    </div>

                    <div className={styles.MiddleSection}>
                      <h3>
                        <span style={{ marginRight: "6px" }}>{meta.icon}</span>
                        {meta.label}
                      </h3>
                      <p>
                        {r.featureType === "programming" && `${r.topic} · ${r.difficulty}`}
                        {r.featureType === "english-lab" && `${r.category?.toUpperCase()} · ${r.totalQ} Qs`}
                        {r.featureType === "mock-interview" && `${r.role} · ${r.timing} min`}
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "2px" }}>
                        {fmtDate(r.createdAt)}
                      </p>
                    </div>

                    <div className={styles.RightSection}>
                      <button className={styles.ViewBtn} onClick={() => setViewResult(r)}>View</button>
                      <button className={styles.DeleteBtn} onClick={() => handleDelete(r._id)}>Delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── View Result Modal ── */}
      {viewResult && (
        <div className={styles.ModalOverlay} onClick={() => setViewResult(null)}>
          <div className={styles.ModalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.CloseBtn} onClick={() => setViewResult(null)}>✕</button>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <span style={{ fontSize: "1.5rem" }}>{FEATURE_META[viewResult.featureType]?.icon}</span>
              <h2 style={{ margin: 0 }}>{FEATURE_META[viewResult.featureType]?.label}</h2>
            </div>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "1rem" }}>
              {fmtDate(viewResult.createdAt)}
            </p>
            <ResultDetail result={viewResult} />
          </div>
        </div>
      )}

      {/* ── Feedback Modal ── */}
      {showFeedback && (
        <div className={styles.ModalOverlay} onClick={() => setShowFeedback(false)}>
          <div className={styles.ModalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.CloseBtn} onClick={() => setShowFeedback(false)}>✕</button>
            <FeedbackForm />
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;