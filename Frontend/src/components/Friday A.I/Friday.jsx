import styles from "./Friday.module.css";
import {Link} from "react-router-dom";
function Friday() {
  return (
    <div className={styles.wrapper}>

      <div className={styles.message}>
        May I Help You
      </div>

      <div className={styles.helpCircle}>
        <Link  className={styles.links} to="/Friday">
          <img
            src="/images/ChatBotPicture.avif"
            alt="Help"
            className={styles.helpImage}
          />
          </Link>
      </div>

    </div>
  );
}

export default Friday;

