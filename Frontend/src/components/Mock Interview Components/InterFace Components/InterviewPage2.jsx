import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./InterviewPage2.module.css";
import { MdCallEnd, MdPause, MdPlayArrow } from "react-icons/md";
import Mic from "../Sub Components/Mic";
import CameraView from "../Sub Components/CameraView";
import SpeechToText from "../Sub Components/SpeechToText";
import { generateInterviewQuestions } from "../../../data/questionEngine.js";

function InterviewPage2() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role = "Frontend Developer", timing = 2, userName = "Candidate" } =
    location.state || {};
  const initialTime = parseInt(timing) * 60;

  const [interviewState, setInterviewState] = useState("stopped");
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionText, setQuestionText] = useState("");
  const [isHRSpeaking, setIsHRSpeaking] = useState(false);

  const qaLogRef = useRef([]);
  const videoRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const hasEndedRef = useRef(false);
  const currentQuestionIdxRef = useRef(0);
  const questionsRef = useRef([]);

  // ── Always-fresh refs ─────────────────────────────────────────────────────
  const interviewStateRef = useRef("stopped");
  const isHRSpeakingRef = useRef(false);

  // Format mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const timerColor = () => {
    const pct = timeLeft / initialTime;
    if (pct > 0.5) return "#4ade80";
    if (pct > 0.2) return "#facc15";
    return "#f87171";
  };

  // Generate questions
  useEffect(() => {
    const q = generateInterviewQuestions(role, timing);
    setQuestions(q);
    questionsRef.current = q;
  }, [role, timing]);

  // Sync state into refs
  useEffect(() => {
    interviewStateRef.current = interviewState;
  }, [interviewState]);

  useEffect(() => {
    isHRSpeakingRef.current = isHRSpeaking;
    // HR bolna shuru ho toh silence timer cancel karo
    if (isHRSpeaking) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, [isHRSpeaking]);

  // Timer countdown
  useEffect(() => {
    if (interviewState !== "running") return;
    if (timeLeft <= 0) {
      endInterview("timeout");
      return;
    }
    const id = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(id);
  }, [interviewState, timeLeft]);

  // ── Silence timer — called directly from SpeechToText ────────────────────
  // ✅ Koi useEffect nahi, koi state dependency nahi
  // Directly function call hoga jab user bolta hai
  const resetSilenceTimer = useCallback(() => {
    // Agar HR bol raha hai ya interview nahi chal raha — ignore karo
    if (isHRSpeakingRef.current || interviewStateRef.current !== "running") return;

    // Purana timer cancel karo
    clearTimeout(silenceTimerRef.current);

    // Naya 8 second timer set karo
    silenceTimerRef.current = setTimeout(() => {
      if (interviewStateRef.current === "running" && !isHRSpeakingRef.current) {
        askNextQuestion(currentQuestionIdxRef.current);
      }
    }, 8000);
  }, []);

  // Save answer
  const handleAnswerComplete = useCallback((question, answer) => {
    if (!question) return;
    const alreadyLogged = qaLogRef.current.some((qa) => qa.question === question);
    if (!alreadyLogged) {
      qaLogRef.current.push({ question, answer });
    }
  }, []);

  // Speak HR question
  const speakQuestion = (question) => {
    if (!question) return;
    window.speechSynthesis.cancel();
    setQuestionText(question);
    setIsHRSpeaking(true);
    isHRSpeakingRef.current = true;

    const speech = new SpeechSynthesisUtterance(question);
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice =
      voices.find(
        (v) =>
          v.name.toLowerCase().includes("female") ||
          v.name.includes("Zira") ||
          v.name.includes("Heera") ||
          v.name.includes("Samantha")
      ) || voices[0];

    speech.voice = femaleVoice;
    speech.rate = 0.95;
    speech.volume = 1.0;

    speech.onstart = () => {
      setIsHRSpeaking(true);
      isHRSpeakingRef.current = true;
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
      videoRef.current?.play();
    };
    speech.onend = () => {
      setIsHRSpeaking(false);
      isHRSpeakingRef.current = false;
      videoRef.current?.pause();
    };

    window.speechSynthesis.speak(speech);
  };

  // Move to next question
  const askNextQuestion = (currentIdx) => {
    clearTimeout(silenceTimerRef.current);
    silenceTimerRef.current = null;

    const nextIdx = currentIdx + 1;
    if (nextIdx < questionsRef.current.length) {
      currentQuestionIdxRef.current = nextIdx;
      setCurrentQuestion(nextIdx);
      speakQuestion(questionsRef.current[nextIdx]);
    } else {
      endInterview("completed");
    }
  };

  const handleStart = () => {
    if (questionsRef.current.length === 0) return;
    hasEndedRef.current = false;
    qaLogRef.current = [];
    currentQuestionIdxRef.current = 0;
    setCurrentQuestion(0);
    setInterviewState("running");
    interviewStateRef.current = "running";
    speakQuestion(questionsRef.current[0]);
  };

  const handlePause = () => {
    if (interviewState === "running") {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
      setInterviewState("paused");
      interviewStateRef.current = "paused";
      window.speechSynthesis.pause();
      videoRef.current?.pause();
    } else if (interviewState === "paused") {
      setInterviewState("running");
      interviewStateRef.current = "running";
      window.speechSynthesis.resume();
      if (isHRSpeakingRef.current) videoRef.current?.play();
    }
  };

  const handleStop = () => endInterview("stopped");

  const endInterview = (reason) => {
    if (hasEndedRef.current) return;
    hasEndedRef.current = true;

    clearTimeout(silenceTimerRef.current);
    silenceTimerRef.current = null;
    window.speechSynthesis.cancel();
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;

    setInterviewState("stopped");
    interviewStateRef.current = "stopped";

    setTimeout(() => {
      navigate("/InterviewResult", {
        state: {
          qaLog: qaLogRef.current,
          role,
          timing,
          userName,
          reason,
        },
      });
    }, 400);
  };

  return (
    <div className={styles.Container}>
      {/* LEFT: HR Panel */}
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

          <div className={styles.timeContainer} style={{ color: timerColor() }}>
            <p>{formatTime(timeLeft)}</p>
          </div>

          {interviewState !== "stopped" && (
            <div className={styles.questionBadge}>
              Q {currentQuestion + 1} / {questions.length}
            </div>
          )}
        </div>

        <div className={styles.ControllerPannel}>
          <div className={styles.BtnContainer}>
            <div className={styles.wrapper}>
              <div className={styles.callCutBtn} onClick={handleStop}>
                <MdCallEnd className={styles.callIcon} />
              </div>
              <span className={styles.btnLabel}>End</span>
            </div>

            <div className={styles.Mic} onClick={handleStart}>
              <Mic isActive={interviewState === "running"} />
            </div>

            <div className={styles.wrapper}>
              <div className={styles.pauseBtn} onClick={handlePause}>
                {interviewState === "paused" ? (
                  <MdPlayArrow className={styles.pauseIcon} />
                ) : (
                  <MdPause className={styles.pauseIcon} />
                )}
              </div>
              <span className={styles.btnLabel}>
                {interviewState === "paused" ? "Resume" : "Pause"}
              </span>
            </div>
          </div>

          {interviewState === "stopped" && (
            <p className={styles.startHint}>
              Press the mic button to start your interview
            </p>
          )}
        </div>
      </div>

      {/* RIGHT: Output Panel */}
      <div className={styles.OutputPannel}>
        <div className={styles.StudentPannel}>
          <CameraView isActive={interviewState === "running"} />
        </div>

        <div className={styles.TextPannel}>
          <div className={styles.QuestionBox}>
            {questionText ? (
              <p>{questionText}</p>
            ) : (
              <p className={styles.placeholderText}>
                Start the interview — conversation will appear here…
              </p>
            )}
          </div>

          {/* ✅ resetSilenceTimer directly pass kiya — no useState involved */}
          <SpeechToText
            interviewState={interviewState}
            isHRSpeaking={isHRSpeaking}
            currentQuestion={questionText}
            onAnswerComplete={handleAnswerComplete}
            onUserSpeaking={resetSilenceTimer}
          />
        </div>
      </div>
    </div>
  );
}

export default InterviewPage2;