import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "./InterviewPage2.module.css";
import { MdCallEnd, MdPause } from "react-icons/md";
import Mic from "../Sub Components/Mic";
import CameraView from "../Sub Components/CameraView";
import SpeechToText from "../Sub Components/SpeechToText";
import { generateInterviewQuestions } from "../../../data/questionEngine.js";

function InterviewPage2() {
  const location = useLocation();
  const { role = "Frontend Developer", timing = 2 } = location.state || {};
  const initialTime = parseInt(timing) * 60;

  const [interviewState, setInterviewState] = useState("stopped");
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionText, setQuestionText] = useState("");
  const [isHRSpeaking, setIsHRSpeaking] = useState(false);
  const [userTranscript, setUserTranscript] = useState("");

  const videoRef = useRef(null);

  // Timer format
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Generate questions based on role & timing
  useEffect(() => {
    const q = generateInterviewQuestions(role, timing);
    setQuestions(q);
  }, [role, timing]);

  // Timer logic
  useEffect(() => {
    if (interviewState !== "running") return;
    if (timeLeft <= 0) {
      handleStop();
      return;
    }
    const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [interviewState, timeLeft]);

  // Speak HR question
  const speakQuestion = (question) => {
    if (!question) return;
    setQuestionText(question);
    setIsHRSpeaking(true);

    const speech = new SpeechSynthesisUtterance(question);
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice =
      voices.find(
        (v) =>
          v.name.toLowerCase().includes("female") ||
          v.name.includes("Zira") ||
          v.name.includes("Heera")
      ) || voices[0]; // fallback to first voice

    speech.voice = femaleVoice;
    speech.rate = 1;
    speech.volume = 1.0;

    // 🎬 Video start as soon as HR starts speaking
    speech.onstart = () => {
      setIsHRSpeaking(true);
      if (videoRef.current) videoRef.current.play();
    };

    // 🎬 Video pause when HR finishes speaking
    speech.onend = () => {
      setIsHRSpeaking(false);
      if (videoRef.current) videoRef.current.pause();
    };

    window.speechSynthesis.speak(speech);
  };

  const askNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      const nextIndex = currentQuestion + 1;
      setCurrentQuestion(nextIndex);
      speakQuestion(questions[nextIndex]);
      setUserTranscript(""); // reset transcript
    }
  };

  // Auto next question on user answer + 4s silence
  useEffect(() => {
    if (!isHRSpeaking && interviewState === "running") {
      if (userTranscript.trim().length > 3) {
        const silenceTimer = setTimeout(() => {
          askNextQuestion();
        }, 4000);
        return () => clearTimeout(silenceTimer);
      }
    }
  }, [userTranscript, isHRSpeaking, interviewState]);

  const handleStart = () => {
    setInterviewState("running");
    if (questions.length > 0) speakQuestion(questions[0]);
  };

  const handlePause = () => {
    if (interviewState === "running") {
      setInterviewState("paused");
      videoRef.current?.pause();
    } else if (interviewState === "paused") {
      setInterviewState("running");
      if (isHRSpeaking && videoRef.current) videoRef.current.play();
    }
  };

  const handleStop = () => {
    setInterviewState("stopped");
    setTimeLeft(initialTime);
    setQuestionText("");
    setCurrentQuestion(0);
    setUserTranscript("");
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
            <video
              ref={videoRef}
              className={styles.images}
              src="/images/Mocks Images/Hr Video.mp4"
              muted={false}
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
            <div className={styles.wrapper}>
              <div className={styles.callCutBtn} onClick={handleStop}>
                <MdCallEnd className={styles.callIcon} />
              </div>
            </div>

            <div className={styles.Mic} onClick={handleStart}>
              <Mic isActive={interviewState === "running"} />
            </div>

            <div className={styles.wrapper}>
              <div className={styles.pauseBtn} onClick={handlePause}>
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
  {/* HR Question Box */}
  <div className={styles.QuestionBox}>
    <h3>HR Question</h3>
    <p>{questionText}</p>
  </div>

  {/* Live Speech Transcript */}
  <SpeechToText
    interviewState={interviewState}
    isHRSpeaking={isHRSpeaking}
    setUserTranscript={setUserTranscript}
  />
</div>
      </div>
    </div>
  );
}

export default InterviewPage2;