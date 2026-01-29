import { FaArrowRight } from "react-icons/fa";
import styles from './InterFace.module.css';

function InterFace(){
  return(
    <div className={styles.Container}>
      <form className={styles.Form}>
        
        <div className={styles.subContainer}>
          <p>First select the programming language</p>
          <div className={styles.row}>
            <FaArrowRight className={styles.icon} />
            <select>
              <option value="">Select Language</option>
              <option value="java">Java</option>
              <option value="mern">MERN</option>
              <option value="python">Python</option>
            </select>
          </div>
        </div>

        <div className={styles.subContainer}>
          <p>Now select the difficulty level</p>
          <div className={styles.row}>
            <FaArrowRight className={styles.icon} />
            <select>
              <option value="">Select Difficulty Level</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        <button type="submit" className={styles.SubmitButton}>
          Start Test
        </button>

      </form>
    </div>
  );
}

export default InterFace;
