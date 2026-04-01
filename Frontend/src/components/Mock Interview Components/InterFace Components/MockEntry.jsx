import { useState } from "react";
import styles from "./MockEntry.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Login Components/useAuth";

function MockEntry() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("Frontend Developer");
  const [timing, setTiming] = useState("2");
  const [resumeFile, setResumeFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const resumeRequiredTimings = ["15", "30"];
  const lockedTimings = ["5", "10", "15", "30"];

  const handleTimingChange = (e) => {
    const selected = e.target.value;
    if (!user && lockedTimings.includes(selected)) {
      setTiming("2");
      setShowPopup(true);
    } else {
      setTiming(selected);
      setShowPopup(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
    } else {
      alert("Sirf PDF file upload karein.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
    } else {
      alert("Sirf PDF file upload karein.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/MockInterview", {
      state: {
        userName,
        role,
        timing,
        resumeFile: resumeFile || null,
      },
    });
  };

  const isResumeRequired = resumeRequiredTimings.includes(timing);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Explore Our Mock Interviews</h1>

        <form onSubmit={handleSubmit} className={styles.Form}>

          {/* Name */}
          <input
            className={styles.Search}
            type="text"
            placeholder="Enter Your Name"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          {/* Resume Upload */}
          <div className={styles.resumeSection}>
            <span className={styles.resumeLabel}>
              {isResumeRequired
                ? "📄 Resume Upload (Recommended for this timing)"
                : "📄 Please Submit Your Resume (Optional)"}
            </span>

            <div
              className={`${styles.dropZone} ${dragOver ? styles.dragOver : ""} ${resumeFile ? styles.uploaded : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById("resumeInput").click()}
            >
              {resumeFile ? (
                <div className={styles.fileInfo}>
                  <span className={styles.fileIcon}>✅</span>
                  <span className={styles.fileName}>{resumeFile.name}</span>
                  <button
                    type="button"
                    className={styles.removeFile}
                    onClick={(e) => { e.stopPropagation(); setResumeFile(null); }}
                  >
                    ✕ Remove
                  </button>
                </div>
              ) : (
                <div className={styles.uploadPrompt}>
                  <span className={styles.uploadIcon}>⬆️</span>
                  <span>PDF drop karein ya click karke upload karein</span>
                  <span className={styles.uploadHint}>Only PDF supported</span>
                </div>
              )}
            </div>

            <input
              id="resumeInput"
              type="file"
              accept=".pdf"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>

          {/* Job Title */}
          <span>Select The Job Title</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={styles.Select}
          >
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Software Developer">Software Developer</option>
          </select>

          {/* Interview Timing */}
          <span>Select The Interview Timing</span>
          <select
            value={timing}
            onChange={handleTimingChange}
            className={styles.Select}
          >
            <option value="2">2 Minutes</option>
            <option value="5">{!user ? "🔒 " : ""}5 Minutes</option>
            <option value="10">{!user ? "🔒 " : ""}10 Minutes</option>
            <option value="15">{!user ? "🔒 " : ""}15 Minutes</option>
            <option value="30">{!user ? "🔒 " : ""}30 Minutes</option>
          </select>

          {isResumeRequired && !resumeFile && (
            <div className={styles.infoBanner}>
              ℹ️ 15 aur 30 minute interviews mein resume upload karna recommended hai — AI aapke resume ke basis pe personalized questions poochega.
            </div>
          )}

          <button type="submit" className={styles.btn}>
            Get Started 🚀
          </button>
        </form>

        {showPopup && (
          <div className={styles.popup}>
            <div className={styles.popupBox}>
              <p>🔒 Login Required</p>
              <p>Yeh timing sirf logged-in users ke liye hai. Login karke saari timings unlock karo.</p>
              <div className={styles.popupButtons}>
                <button onClick={() => navigate("/signin")} className={styles.btn}>
                  Login karo
                </button>
                <button onClick={() => setShowPopup(false)} className={styles.closeBtn}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MockEntry;