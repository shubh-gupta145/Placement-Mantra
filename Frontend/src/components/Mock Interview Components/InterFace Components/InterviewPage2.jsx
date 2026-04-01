import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./InterviewPage2.module.css";
import { MdCallEnd, MdPause, MdPlayArrow } from "react-icons/md";
import Mic from "../Sub Components/Mic";
import CameraView from "../Sub Components/CameraView";
import SpeechToText from "../Sub Components/SpeechToText";
import { generateInterviewQuestions } from "../../../data/questionEngine.js";
import { extractTextFromPDF } from "../../../utils/resumeParser.js";
import { generateQuestionsFromResume } from "../../../utils/geminiQuestions.js";
import useFeatureTrack from '../../../utils/useFeatureTrack';

function InterviewPage2() {
  useFeatureTrack('mock-interview');

  const location = useLocation();
  const navigate = useNavigate();
  const {
    role = "Frontend Developer",
    timing = 2,
    userName = "Candidate",
    resumeFile = null,
  } = location.state || {};

  const initialTime = parseInt(timing) * 60;

  const [interviewState, setInterviewState] = useState("stopped");
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionText, setQuestionText] = useState("");
  const [isHRSpeaking, setIsHRSpeaking] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [resumeLoaded, setResumeLoaded] = useState(false);

  const qaLogRef = useRef([]);
  const videoRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const hasEndedRef = useRef(false);
  const currentQuestionIdxRef = useRef(0);
  const questionsRef = useRef([]);

  const interviewStateRef = useRef("stopped");
  const isHRSpeakingRef = useRef(false);

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

  // ── Questions generate karo — resume hai toh Gemini se, warna default ──
  useEffect(() => {
    const setupQuestions = async () => {
      // Resume-based questions sirf 15 aur 30 min ke liye
      const resumeTimings = [15, 30];
      const timingNum = parseInt(timing);

      if (resumeFile && resumeTimings.includes(timingNum)) {
        setIsLoadingQuestions(true);
        setLoadingMessage("📄 Resume parse ho raha hai...");

        try {
          // Step 1: PDF se text extract karo
          const resumeText = await extractTextFromPDF(resumeFile);

          if (resumeText && resumeText.length > 100) {
            setLoadingMessage("🤖 AI aapke resume ke basis pe questions bana raha hai...");
            setResumeLoaded(true);

            // Step 2: Gemini se questions generate karo
            const aiQuestions = await generateQuestionsFromResume(resumeText, role, timingNum);

            if (aiQuestions && aiQuestions.length > 0) {
              setQuestions(aiQuestions);
              questionsRef.current = aiQuestions;
              setLoadingMessage(`✅ ${aiQuestions.length} personalized questions ready!`);
            } else {
              // Gemini fail ho gaya — default questions use karo
              console.warn("Gemini failed, using default questions");
              const fallback = generateInterviewQuestions(role, timing);
              setQuestions(fallback);
              questionsRef.current = fallback;
              setLoadingMessage("✅ Questions ready! (Default mode)");
            }
          } else {
            // Resume parse nahi hua — default
            const fallback = generateInterviewQuestions(role, timing);
            setQuestions(fallback);
            questionsRef.current = fallback;
            setLoadingMessage("⚠️ Resume parse nahi hua, default questions use ho rahe hain.");
          }
        } catch (err) {
          console.error("Question setup error:", err);
          const fallback = generateInterviewQuestions(role, timing);
          setQuestions(fallback);
          questionsRef.current = fallback;
          setLoadingMessage("✅ Questions ready!");
        }

        // Loading message 2 second baad clear karo
        setTimeout(() => {
          setIsLoadingQuestions(false);
          setLoadingMessage("");
        }, 2000);

      } else {
        // No resume ya short timing — default algorithm
        const q = generateInterviewQuestions(role, timing);
        setQuestions(q);
        questionsRef.current = q;
      }
    };

    setupQuestions();
  }, [role, timing, resumeFile]);

  // Sync state into refs
  useEffect(() => {
    interviewStateRef.current = interviewState;
  }, [interviewState]);

  useEffect(() => {
    isHRSpeakingRef.current = isHRSpeaking;
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

  const resetSilenceTimer = useCallback(() => {
    if (isHRSpeakingRef.current || interviewStateRef.current !== "running") return;
    clearTimeout(silenceTimerRef.current);
    silenceTimerRef.current = setTimeout(() => {
      if (interviewStateRef.current === "running" && !isHRSpeakingRef.current) {
        askNextQuestion(currentQuestionIdxRef.current);
      }
    }, 8000);
  }, []);

  const handleAnswerComplete = useCallback((question, answer) => {
    if (!question) return;
    const alreadyLogged = qaLogRef.current.some((qa) => qa.question === question);
    if (!alreadyLogged) {
      qaLogRef.current.push({ question, answer });
    }
  }, []);

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
    if (questionsRef.current.length === 0 || isLoadingQuestions) return;
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
          resumeBased: resumeLoaded,
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

          {/* Resume badge */}
          {resumeLoaded && (
            <div className={styles.resumeBadge}>
              📄 Resume-Based Interview
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

            <div
              className={styles.Mic}
              onClick={handleStart}
              style={{ opacity: isLoadingQuestions ? 0.5 : 1, cursor: isLoadingQuestions ? "not-allowed" : "pointer" }}
            >
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

          {/* Loading / hint message */}
          {isLoadingQuestions ? (
            <p className={styles.startHint} style={{ color: "#60a5fa" }}>
              {loadingMessage || "⏳ Questions prepare ho rahe hain..."}
            </p>
          ) : loadingMessage ? (
            <p className={styles.startHint} style={{ color: "#4ade80" }}>
              {loadingMessage}
            </p>
          ) : interviewState === "stopped" ? (
            <p className={styles.startHint}>
              Press the mic button to start your interview
            </p>
          ) : null}
        </div>
      </div>

      {/* RIGHT: Output Panel */}
      <div className={styles.OutputPannel}>
        <div className={styles.StudentPannel}>
          <CameraView isActive={interviewState === "running"} />
        </div>

        <div className={styles.TextPannel}>
          <div className={styles.QuestionBox}>
            {isLoadingQuestions ? (
              <p className={styles.placeholderText} style={{ color: "#60a5fa" }}>
                {loadingMessage}
              </p>
            ) : questionText ? (
              <p>{questionText}</p>
            ) : (
              <p className={styles.placeholderText}>
                Start the interview — conversation will appear here…
              </p>
            )}
          </div>

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