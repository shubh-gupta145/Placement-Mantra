import { useState } from "react";
import styles from "./MockEntry.module.css";
import { useNavigate } from "react-router-dom";
import UploadFile from "../Sub Components/UploadFile";
import { useAuth } from "../../Login Components/useAuth"; // 👈 apna path yahan set karo

function MockEntry() {
  const navigate = useNavigate();
  const { user } = useAuth(); // 👈 ya jaise tumhara context return karta ho

  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("Frontend Developer");
  const [timing, setTiming] = useState("2");
  const [showPopup, setShowPopup] = useState(false);

  const lockedTimings = ["5", "10", "15", "30"];

  const handleTimingChange = (e) => {
    const selected = e.target.value;
    if (!user && lockedTimings.includes(selected)) {
      setTiming("2");         // wapas 2 min pe reset
      setShowPopup(true);     // popup dikhao
    } else {
      setTiming(selected);
      setShowPopup(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/MockInterview", { state: { userName, role, timing } });
  };

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
          <span>
            Please Submit Your Resume
            <UploadFile />
          </span>

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

          <button type="submit" className={styles.btn}>Get Started 🚀</button>

        </form>

        {/* Login Popup */}
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