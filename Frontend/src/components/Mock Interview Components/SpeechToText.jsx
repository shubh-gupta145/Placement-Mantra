import { useEffect, useRef, useState } from "react";
import styles from "./SpeechToText.module.css";

const SpeechToText = ({ interviewState }) => {
  const [text, setText] = useState("");
  const recognitionRef = useRef(null);
  const isRunningRef = useRef(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Browser not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript + " ";
        }
      }

      setText((prev) => prev + transcript);
    };

    recognition.onend = () => {
      isRunningRef.current = false;
    };

    recognitionRef.current = recognition;
  }, []);

  useEffect(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    // START
    if (interviewState === "running" && !isRunningRef.current) {
      try {
        recognition.start();
        isRunningRef.current = true;
      } catch (err) {
        console.log("Start error:", err);
      }
    }

    // PAUSE
    if (interviewState === "paused" && isRunningRef.current) {
      try {
        recognition.stop();
        isRunningRef.current = false;
      } catch (err) {
        console.log("Pause error:", err);
      }
    }

    // STOP (Complete Reset)
    if (interviewState === "stopped") {
      try {
        recognition.stop();
      } catch (err) {
        console.log("Stop error:", err);
      }
      isRunningRef.current = false;
      setText("");
    }

  }, [interviewState]);

  return (
    <div className={styles.wrapper}>
      {text || "Interview not started..."}
    </div>
  );
};

export default SpeechToText;
