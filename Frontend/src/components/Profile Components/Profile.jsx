import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { MdLocationOn } from "react-icons/md";
import styles from "./Profile.module.css";
import ContributionGraph from "./ContributionGraph";
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
<ul>
    <li>  <MdLocationOn />India</li>
  <li><FaGithub /> GitHub Profile</li>
  <li><FaLinkedin /> LinkedIn Profile</li>
  <li><SiLeetcode /> LeetCode Profile</li>
</ul>
<span className={styles.span}>Skills java python</span>
</div>
</div>
<div className={styles.SecondContainer}>
<div className={styles.subContainer1}>
<ContributionGraph/>
</div>
<div className={styles.subContainer2}>
<h1>Your Previous Tests Result</h1>
<div className={styles.UserTasks}>
    <div className={styles.TasksContainer}>
        <ul>
            <li>
        <div className="ProgressCycle">
        <span>75%</span>
        </div>
            </li>
            <li>
                <span>Mock Test</span>
            </li>
            <li>
                <span>Completed on 12th Jan 2024</span>
            </li>
            <li>
                <button>view</button>
            </li>
                        <li>
                <button>Delete</button>
            </li>
        </ul>
    </div>
</div>
</div>
</div>
</div>
</>
    );
}
export default Profile;