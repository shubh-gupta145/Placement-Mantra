import styles from "./Mic.module.css";
import { MdMic } from "react-icons/md";
function Mic(){
    return(
<>
    <div className={styles.micWrapper}>
      <div className={styles.micRing}></div>

      <button className={styles.micBtn}>
        <MdMic className={styles.micIcon} />
      </button>
    </div>
</>
    );
}
export default Mic;