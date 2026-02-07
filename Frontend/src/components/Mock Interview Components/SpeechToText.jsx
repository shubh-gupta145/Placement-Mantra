import { useEffect, useState } from "react";
import styles from "./SpeechToText.module.css";

const SpeechToText = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    // Browser support check
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;   // lagataar sunta rahe
    recognition.interimResults = true; // bolte waqt text dikhata rahe
    recognition.lang = "en-IN"; // English (India)

    recognition.onresult = (event) => {
      let finalText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        finalText += event.results[i][0].transcript;
      }

      setText(finalText);
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <h3>Live Speech to Text</h3>
      <div className={styles.textContainer}>
        {text || "Start speaking..."}
      </div>
    </div>
  );
};

export default SpeechToText;
