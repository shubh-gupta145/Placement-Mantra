import { useState, useRef } from "react";
import styles from "./Mic.module.css";
import { MdMic } from "react-icons/md";

function Mic({ isPaused, isCut }) {

  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const startRecording = async () => {
    if (isRecording) return;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.start();
    setIsRecording(true);
    console.log("Recording Started...");
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      console.log("Recording Stopped");
    }
  };

  const deleteRecording = () => {
    audioChunksRef.current = [];
    console.log("Recording Deleted");
  };

  // 🔹 Pause logic
  if (isPaused && isRecording) {
    stopRecording();
  }

  // 🔹 Cut logic
  if (isCut) {
    stopRecording();
    deleteRecording();
  }

  return (
    <>
      <div className={styles.micWrapper}>
        <div className={styles.micRing}></div>

        <button
          className={styles.micBtn}
          onClick={startRecording}
        >
          <MdMic className={styles.micIcon} />
        </button>
      </div>
    </>
  );
}

export default Mic;