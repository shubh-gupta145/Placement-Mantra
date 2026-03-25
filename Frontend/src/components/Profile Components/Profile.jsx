import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { MdLocationOn } from "react-icons/md";
import styles from "./Profile.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFeatureTrack from '../../utils/useFeatureTrack';
import FeedbackForm from '../Admin Panel/Feedback/FeedbackForm'; // ← apna path check karo

function Profile() {
  useFeatureTrack('mock-interview');
  const [profile, setProfile] = useState({});
  const [showFeedback, setShowFeedback] = useState(false); // ← modal state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = localStorage.getItem("email") || localStorage.getItem("userEmail");
        if (!email) {
          console.log("Email not found in localStorage");
          return;
        }
        const res = await fetch(`http://localhost:5000/get-profile/${email}`);
        const data = await res.json();
        if (data) setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
    window.addEventListener("focus", fetchProfile);
    return () => window.removeEventListener("focus", fetchProfile);
  }, []);

  return (
    <>
      <div className={styles.container}>

        <div className={styles.FirstContainer}>

          <div className={styles.profileHeader}>
            <div className={styles.imageContainer}>
              <img src={profile?.image || "/default-profile.png"} alt="Profile Picture" />
            </div>
            <span className={styles.UserName}>
              {profile?.name || "User Name"}
            </span>
          </div>

          <p className={styles.para}>
            {profile?.summary || "No summary added yet"}
          </p>

          <Link className={styles.links} to="/EditProfile">
            <button className={styles.Button}>Edit Profile</button>
          </Link>

          <div className={styles.listContainer}>
            <ul className={styles.Profiles}>
              <li><MdLocationOn /> {profile?.location || "Location not added"}</li>
              <li><FaGithub /> {profile?.github || "GitHub not added"}</li>
              <li><FaLinkedin /> {profile?.linkedin || "LinkedIn not added"}</li>
              <li><SiLeetcode /> {profile?.leetcode || "LeetCode not added"}</li>
            </ul>
          </div>

          {/* ── Feedback Link ── */}
          <button
            className={styles.FeedbackBtn}
            onClick={() => setShowFeedback(true)}
          >
            💬 Feedback
          </button>

        </div>

        <div className={styles.subContainer2}>
          <h1 className={styles.heading}>Your Previous Tests Result</h1>
          <div className={styles.UserTasks}>
            <div className={styles.TaskCard}>
              <div className={styles.LeftSection}>
                <div className={styles.ProgressCircle}>75%</div>
              </div>
              <div className={styles.MiddleSection}>
                <h3>Mock Test</h3>
                <p>Completed on 12th Jan 2024</p>
              </div>
              <div className={styles.RightSection}>
                <button className={styles.ViewBtn}>View</button>
                <button className={styles.DeleteBtn}>Delete</button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── Feedback Modal ── */}
      {showFeedback && (
        <div className={styles.ModalOverlay} onClick={() => setShowFeedback(false)}>
          <div className={styles.ModalContent} onClick={(e) => e.stopPropagation()}>

            {/* Cross Button */}
            <button
              className={styles.CloseBtn}
              onClick={() => setShowFeedback(false)}
            >
              ✕
            </button>

            <FeedbackForm />

          </div>
        </div>
      )}
    </>
  );
}

export default Profile;