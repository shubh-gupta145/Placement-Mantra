import styles from "./InterviewPage2.module.css";
import { MdCallEnd } from "react-icons/md";
import { MdPause } from "react-icons/md";
import Mic from "./Mic";
import CameraView from "./CameraView";
function InterviewPage(){
    return(
        <>
        <div className={styles.Container}>
<div className={styles.ScreenPannel}>
    <div className={styles.HrContainer}>
<div className={styles.HrLogo}>
    <img className={styles.images} src="./images/Mocks Images/HrAvtaar.avif" alt="Hr Logo Picture"/>
</div>
<div className={styles.timeContainer}>
<p>01:00</p>
</div>
    </div>
    <div className={styles.ControllerPannel}>
      <div className={styles.BtnContainer}>
        <div className={styles.StopBtn}>
    <div className={styles.wrapper}>
      <div className={styles.callCutBtn}>
        <MdCallEnd className={styles.callIcon} />
      </div>
    </div>
        </div>
<div className={styles.Mic}>
    <Mic/>
</div>
    <div className={styles.wrapper}>
      <div className={styles.pauseBtn}>
        <MdPause className={styles.pauseIcon} />
      </div>
    </div>
      </div>
    </div>
</div>
<div className={styles.OutputPannel}>
        <div className={styles.StudentPannel}>
<CameraView/>
    </div>
    <div className={styles.TextPannel}>

    </div>
</div>
        </div>
        </>
    );
}
export default InterviewPage;