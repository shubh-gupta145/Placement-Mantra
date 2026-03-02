import { useEffect, useRef, useState } from "react";
import styles from "./SpeechToText.module.css";
function SpeechToText({ interviewState }) {

  const [text, setText] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Use Google Chrome Browser");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
      }

      setText(transcript);
    };

    recognition.onerror = (event) => {
      console.log("Speech Error:", event.error);
    };

    recognition.onend = () => {
      // Auto restart when running
      if (interviewState === "running") {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;

  }, []);

  useEffect(() => {

    if (!recognitionRef.current) return;

    if (interviewState === "running") {
      try {
        recognitionRef.current.start();
      } catch (err) {}
    }

    if (interviewState === "paused") {
      recognitionRef.current.stop();
    }

    if (interviewState === "stopped") {
      recognitionRef.current.stop();
      setText("");
    }

  }, [interviewState]);

  return (
    <div className={styles.wrapper}>
      
      <h2 className={styles.heading}>
        Live Speech Transcript
      </h2>

      <div className={styles.textContainer}>
        {text ? text : "Click on Mic and start speaking..."}
      </div>
    </div>
  );
}

export default SpeechToText;