import { useEffect, useRef, useState } from "react";
import styles from "./SpeechToText.module.css";

function SpeechToText({ interviewState, isHRSpeaking, setUserTranscript }) {
  const [text, setText] = useState([]);
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

      // Append transcript to array
      setText((prev) => {
        const updated = [...prev];
        // Replace last element while user is speaking current question
        if (prev.length === 0) {
          updated.push(transcript);
        } else {
          updated[updated.length - 1] = transcript;
        }
        // Update parent for auto next question logic
        if (setUserTranscript) setUserTranscript(transcript);
        return updated;
      });
    };

    recognition.onerror = (event) => console.log("Speech Error:", event.error);

    recognition.onend = () => {
      if (interviewState === "running" && !isHRSpeaking) recognition.start();
    };

    recognitionRef.current = recognition;
  }, []);

  useEffect(() => {
    if (!recognitionRef.current) return;

    if (interviewState === "running" && !isHRSpeaking) {
      try {
        recognitionRef.current.start();
      } catch (err) {}
    } else {
      recognitionRef.current.stop();
    }

    if (interviewState === "stopped") {
      recognitionRef.current.stop();
      setText([]);
      if (setUserTranscript) setUserTranscript("");
    }
  }, [interviewState, isHRSpeaking]);

  // Add new empty line for next question
  useEffect(() => {
    if (!isHRSpeaking && interviewState === "running") {
      setText((prev) => [...prev, ""]); // new blank line for next answer
    }
  }, [isHRSpeaking]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Live Speech Transcript</h2>
      <div className={styles.textContainer}>
        {text.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export default SpeechToText;