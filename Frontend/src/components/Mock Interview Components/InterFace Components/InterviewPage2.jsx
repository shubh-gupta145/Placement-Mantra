import { useState, useEffect, useRef } from "react";
import styles from "./InterviewPage2.module.css";
import { MdCallEnd } from "react-icons/md";
import { MdPause } from "react-icons/md";
import Mic from "../Sub Components/Mic";
import CameraView from "../Sub Components/CameraView";
import SpeechToText from "../Sub Components/SpeechToText";

function InterviewPage2() {

  const [interviewState, setInterviewState] = useState("stopped");
  const [timeLeft, setTimeLeft] = useState(60);

  const videoRef = useRef(null);

  
  // 🎯 FORMAT TIMER
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // 🎯 TIMER LOGIC
  useEffect(() => {
    let timer;

    if (interviewState === "running" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      handleStop();
    }

    return () => clearInterval(timer);
  }, [interviewState, timeLeft]);

  // 🎯 START
  const handleStart = () => {
    setInterviewState("running");

    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  // 🎯 PAUSE / RESUME
  const handlePause = () => {
    if (interviewState === "running") {
      setInterviewState("paused");
      videoRef.current?.pause();
    } else if (interviewState === "paused") {
      setInterviewState("running");
      videoRef.current?.play();
    }
  };

  // 🎯 STOP (RESET EVERYTHING)
  const handleStop = () => {
    setInterviewState("stopped");
    setTimeLeft(60);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.ScreenPannel}>
        
        <div className={styles.HrContainer}>
          <div className={styles.HrLogo}>

            {/* 🎥 CONTROLLED VIDEO */}
            <video
              ref={videoRef}
              className={styles.images}
              src="/images/Mocks Images/Hr Video.mp4"
              muted
              playsInline
              loop
            />

          </div>

          <div className={styles.timeContainer}>
            <p>{formatTime(timeLeft)}</p>
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
  );
}

export default InterviewPage2;