import styles from "./MockEntry.module.css";
import { useNavigate } from "react-router-dom";
import UploadFile from "../Sub Components/UploadFile";

function MockEntry() {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/MockInterview");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>

        <h1 className={styles.heading}>
          Explore Our Mock Interviews
        </h1>

        <form onSubmit={handleSubmit} className={styles.Form}>

          <input
            className={styles.Search}
            type="text"
            placeholder="Enter Your Name"
            required
          />

          <span>
            Please Submit Your Resume
            <UploadFile />
          </span>

          {/* Job Title */}
          <span>Select The Job Title</span>
          <select>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Software Developer">Software Developer</option>
          </select>

          {/* Interview Timing */}
          <span>Select The Interview Timing</span>
          <select>
            <option value="2">2 Minutes</option>
            <option value="5">5 Minutes</option>
            <option value="10">10 Minutes</option>
            <option value="15">15 Minutes</option>
            <option value="30">30 Minutes</option>
          </select>

          <button type="submit" className={styles.btn}>
            Get Started 🚀
          </button>

        </form>

      </div>
    </div>
  );
}

export default MockEntry;