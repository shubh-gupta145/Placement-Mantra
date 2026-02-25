import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { MdLocationOn } from "react-icons/md";
import styles from "./Profile.module.css";
import {Link} from "react-router-dom"
function Profile(){
    return(
<>
<div className={styles.container}>
<div className={styles.FirstContainer}>
    <div className={styles.profileHeader}>
<div className={styles.imageContainer}>
<img src="" alt="Profile Picture"/>
</div>
<span className={styles.UserName}>Shubh Gupta</span> 
    </div>
<p className={styles.para}>Hello coder my name is shubh gupta. I am the software developer I am create Very excited project like Placement Mantra Resume Craft and Pocket manger.</p>
<Link  className={styles.links} to="/EditProfile"><button className={styles.Button}>Edit Profile</button></Link>
<div className={styles.listContainer}>
<ul className={styles.Profiles}>
    <li>  <MdLocationOn />India</li>
  <li><FaGithub /> GitHub Profile</li>
  <li><FaLinkedin /> LinkedIn Profile</li>
  <li><SiLeetcode /> LeetCode Profile</li>
</ul>
<span className={styles.Skill}>Skills java python</span>
</div>
</div>
<div className={styles.SecondContainer}>
  <div className={styles.subContainer2}>
    <h1 className={styles.heading}>Your Previous Tests Result</h1>

    <div className={styles.UserTasks}>
      <div className={styles.TaskCard}>
        
        <div className={styles.LeftSection}>
          <div className={styles.ProgressCircle}>
            75%
          </div>
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
</div>
</>
    );
}
export default Profile;