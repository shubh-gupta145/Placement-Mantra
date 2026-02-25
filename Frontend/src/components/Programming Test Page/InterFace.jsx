import { FaArrowRight } from "react-icons/fa";
import { FaUserEdit, FaSearch, FaChartLine, FaCheckCircle } from "react-icons/fa";
import styles from './InterFace.module.css';
import Footar from "../Home Page component/Footar";
import HeroCarousel from "./Carsoul";

function InterFace(){
  return(
    <div className={styles.Container}>
      
      <HeroCarousel/>

      {/* ✅ Test Process Section */}
      <div className={styles.SecondContainer}>
        <h2 className={styles.sectionTitle}>How Our Test System Work</h2>
        <p className={styles.sectionSubtitle}>
          Follow these simple steps to analyze and improve your Programming Skills for better job opportunities.
        </p>

        <div className={styles.stepsWrapper}>

          <div className={styles.stepCard}>
            <FaUserEdit className={styles.icon}/>
            <h3>Fill Details</h3>
            <p>Please Fill The Full Form To Give The Test.</p>
          </div>

          <div className={styles.stepCard}>
            <FaSearch className={styles.icon}/>
            <h3>Attempt All The Questions</h3>
            <p>Attempt all the questions in the test to get a complete analysis.</p>
          </div>

          <div className={styles.stepCard}>
            <FaCheckCircle className={styles.icon}/>
            <h3> Results</h3>
            <p>In This Result You Find Your Mistake And Your Test Score.</p>
          </div>

        </div>
      </div>
<div className={styles.TestContainer}>
  <div className={styles.TestContainerContent}>
    <h1>Fill The Following Details</h1>
<form action="/Tests" className={styles.form} method="post">
    <input type="text"  placeholder="Enter Your Name" className={styles.inputField}/>

    <select className={styles.selectField}>
      <option>DSA Based Theory Question</option>
      <option>Web Development</option>
      <option>Aptitue</option>
      <option>Programming Language Question</option>
    </select>

    <select className={styles.selectField}>
      <option>Easy</option>
      <option>Medium</option>
      <option>Hard</option>
      <option>Expert</option>
      <option>Random</option>
    </select>

    <button type="Submit" className={styles.submitButton}>
      Submit <FaArrowRight/>
    </button>
</form>
  </div>
</div>
<Footar/>
    </div>
  );
}

export default InterFace;