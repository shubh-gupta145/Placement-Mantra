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
        <h1 className={styles.heading}>Explore Our Mock Interviews</h1>
<form onSubmit={handleSubmit} className={styles.Form}>
        <input className={styles.Search} type="text" placeholder="Enter The Your Name" required />
        <span>Please Sunbmit Your Resume 
          <UploadFile/>
        </span>
        <select>
          <span>Select The Job Title</span>
          <option value="Fronted Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
          <option value="Software Developer">Software Developer</option>
        </select>
                <select>
                  <span>Select The Interview Timing</span>
  <option value="2">2 Minitus</option>
  <option value="5">5 Minitus</option>
  <option value="10">10 Minitus</option>
  <option value="15">15 Minitus</option>
  <option value="30">30 Minitus</option>
        </select>
        <button type="Submit" className={styles.btn}>        
            Get Started 🚀
            </button>
        </form>
      </div>
    </div>
  );
}

export default MockEntry;
