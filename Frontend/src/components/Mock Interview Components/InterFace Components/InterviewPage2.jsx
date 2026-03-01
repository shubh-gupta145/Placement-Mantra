import { useState } from "react";
import styles from "./InterviewPage2.module.css";
import { MdCallEnd } from "react-icons/md";
import { MdPause } from "react-icons/md";
import Mic from "../Sub Components/Mic";
import CameraView from "../Sub Components/CameraView";
import SpeechToText from "../Sub Components/SpeechToText";

function InterviewPage2() {

  const [interviewState, setInterviewState] = useState("stopped");
  // stopped | running | paused

  const handleStart = () => {
    setInterviewState("running");
  };

  const handlePause = () => {
    if (interviewState === "running") {
      setInterviewState("paused");
    } else if (interviewState === "paused") {
      setInterviewState("running");
    }
  };

  const handleStop = () => {
    setInterviewState("stopped");
  };

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.ScreenPannel}>
          
          <div className={styles.HrContainer}>
            <div className={styles.HrLogo}>
              <img
                className={styles.images}
                src="./images/Mocks Images/HrAvtaar.avif"
                alt="Hr Logo Picture"
              />
            </div>

            <div className={styles.timeContainer}>
              <p>01:00</p>
            </div>
          </div>

          <div className={styles.ControllerPannel}>
            <div className={styles.BtnContainer}>

              {/* CALL CUT */}
              <div className={styles.wrapper}>
                <div
                  className={styles.callCutBtn}
                  onClick={handleStop}
                >
                  <MdCallEnd className={styles.callIcon} />
                </div>
              </div>

              {/* MIC START */}
              <div
                className={styles.Mic}
                onClick={handleStart}
              >
                <Mic isActive={interviewState === "running"} />
              </div>

              {/* PAUSE */}
              <div className={styles.wrapper}>
                <div
                  className={styles.pauseBtn}
                  onClick={handlePause}
                >
                  <MdPause className={styles.pauseIcon} />
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className={styles.OutputPannel}>
          <div className={styles.StudentPannel}>
            <CameraView isActive={interviewState === "running"} />
          </div>

          <div className={styles.TextPannel}>
            <SpeechToText interviewState={interviewState} />
          </div>
        </div>
      </div>
    </>
  );
}

export default InterviewPage2;
