import { useEffect, useRef, useState } from "react";
import styles from "./SpeechToText.module.css";

function SpeechToText({
  interviewState,
  isHRSpeaking,
  currentQuestion,
  onAnswerComplete,
  onUserSpeaking,
}) {
  const [conversation, setConversation] = useState([]);
  const recognitionRef = useRef(null);
  const isRunningRef = useRef(false);
  const finalTranscriptRef = useRef("");
  const restartTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const prevQuestionRef = useRef("");

  const audioContextRef = useRef(null);
  const streamRef = useRef(null);

  // ── Auto scroll ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [conversation]);

  // ── Mic setup — noise cancellation aggressive ────────────────────────────────
  const boostMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: { ideal: true },
          noiseSuppression: { ideal: true },   // ✅ Fan/AC noise suppress
          autoGainControl: { ideal: true },     // ✅ Soft voice auto boost
          sampleRate: { ideal: 16000 },         // ✅ 16kHz — speech recognition ke liye optimal
          channelCount: 1,
        },
      });
      streamRef.current = stream;

      const audioContext = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: 16000,                      // ✅ Speech ke liye best sample rate
      });
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);

      // ✅ High-pass filter — low frequency noise (fan/AC hum) hatao
      const highPassFilter = audioContext.createBiquadFilter();
      highPassFilter.type = "highpass";
      highPassFilter.frequency.value = 100;    // 100Hz se neeche ka noise cut
      highPassFilter.Q.value = 0.7;

      // ✅ Gain boost — soft voice amplify karo
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 2.0;

      // ✅ Compressor — sudden loud sounds control, soft sounds boost
      const compressor = audioContext.createDynamicsCompressor();
      compressor.threshold.value = -40;
      compressor.knee.value = 15;
      compressor.ratio.value = 6;
      compressor.attack.value = 0.001;
      compressor.release.value = 0.1;

      // Chain: source → highpass → gain → compressor → output
      source.connect(highPassFilter);
      highPassFilter.connect(gainNode);
      gainNode.connect(compressor);
      compressor.connect(audioContext.destination);

    } catch (err) {
      console.warn("Mic setup failed:", err);
    }
  };

  const cleanupAudio = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    audioContextRef.current?.close();
    audioContextRef.current = null;
  };

  // ── New question aaya ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!currentQuestion?.trim()) return;
    if (currentQuestion === prevQuestionRef.current) return;

    if (prevQuestionRef.current && onAnswerComplete) {
      onAnswerComplete(prevQuestionRef.current, finalTranscriptRef.current.trim());
    }

    prevQuestionRef.current = currentQuestion;
    finalTranscriptRef.current = "";

    setConversation((prev) => {
      if (prev.length >= 2) {
        const lastHR = prev[prev.length - 2];
        if (lastHR?.type === "hr" && lastHR?.text === currentQuestion) return prev;
      }
      return [
        ...prev,
        { type: "hr", text: currentQuestion },
        { type: "student", text: "" },
      ];
    });
  }, [currentQuestion]);

  // ── Recognition setup ────────────────────────────────────────────────────────
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert("Please use Google Chrome.");
      return;
    }

    const recognition = new SR();

    // ✅ en-US — Google ka sabse accurate speech model
    // en-IN mein Indian accent support hai but accuracy kam hai
    recognition.lang = "en-US";

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 3;

    recognition.onresult = (event) => {
      let interimText = "";
      let newFinal = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];

        if (result.isFinal) {
          // ✅ Sabse zyada confident alternative lo
          let bestTranscript = result[0].transcript;
          let bestConfidence = result[0].confidence || 0;

          for (let j = 1; j < result.length; j++) {
            const conf = result[j].confidence || 0;
            if (conf > bestConfidence) {
              bestConfidence = conf;
              bestTranscript = result[j].transcript;
            }
          }

          // ✅ Threshold 0.5 — kam confident results reject karo
          // Chrome mein confidence 0 aata hai jab calculate nahi hoti — tab accept karo
          if (bestConfidence >= 0.5 || bestConfidence === 0) {
            newFinal += bestTranscript + " ";
          }

        } else {
          interimText += result[0].transcript;
        }
      }

      if (newFinal) finalTranscriptRef.current += newFinal;

      const displayText = (finalTranscriptRef.current + interimText).trim();

      // Bubble update
      setConversation((prev) => {
        const updated = [...prev];
        for (let i = updated.length - 1; i >= 0; i--) {
          if (updated[i].type === "student") {
            updated[i] = { ...updated[i], text: displayText };
            break;
          }
        }
        return updated;
      });

      // Silence timer reset karo (no state update)
      if (displayText.length > 3 && onUserSpeaking) {
        onUserSpeaking();
      }
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech") safeRestart();
      else if (event.error === "not-allowed")
        alert("Microphone permission denied. Please allow mic in browser settings.");
      else if (event.error === "audio-capture")
        alert("No microphone found.");
      else console.warn("Speech error:", event.error);
    };

    recognition.onend = () => {
      isRunningRef.current = false;
      if (interviewState === "running" && !isHRSpeaking) safeRestart();
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.onend = null;
      recognition.onresult = null;
      recognition.onerror = null;
      safeStop();
      cleanupAudio();
    };
  }, []); // eslint-disable-line

  const safeStart = () => {
    if (!recognitionRef.current || isRunningRef.current) return;
    try { recognitionRef.current.start(); isRunningRef.current = true; } catch (_) {}
  };

  const safeStop = () => {
    clearTimeout(restartTimeoutRef.current);
    if (!recognitionRef.current || !isRunningRef.current) return;
    try { recognitionRef.current.stop(); isRunningRef.current = false; } catch (_) {}
  };

  const safeRestart = () => {
    clearTimeout(restartTimeoutRef.current);
    restartTimeoutRef.current = setTimeout(() => {
      if (
        recognitionRef.current &&
        !isRunningRef.current &&
        interviewState === "running" &&
        !isHRSpeaking
      ) safeStart();
    }, 300);
  };

  // ── State changes ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!recognitionRef.current) return;

    if (interviewState === "running" && !isHRSpeaking) {
      boostMicrophone();
      safeStart();
    } else {
      safeStop();
    }

    if (interviewState === "stopped") {
      if (prevQuestionRef.current && onAnswerComplete) {
        onAnswerComplete(prevQuestionRef.current, finalTranscriptRef.current.trim());
      }
      setConversation([]);
      finalTranscriptRef.current = "";
      prevQuestionRef.current = "";
      cleanupAudio();
    }
  }, [interviewState, isHRSpeaking]); // eslint-disable-line

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Interview Conversation</h2>
      <div className={styles.textContainer} ref={containerRef}>
        {conversation.length === 0 ? (
          <p className={styles.placeholder}>
            Start the interview — conversation will appear here...
          </p>
        ) : (
          conversation.map((msg, index) => (
            <div
              key={index}
              className={`${styles.bubble} ${
                msg.type === "hr" ? styles.hrBubble : styles.studentBubble
              }`}
            >
              <span className={styles.label}>
                {msg.type === "hr" ? "👩‍💼 HR" : "🎓 You"}
              </span>
              <p className={styles.bubbleText}>
                {msg.text
                  ? msg.text
                  : msg.type === "student" &&
                    interviewState === "running" &&
                    !isHRSpeaking
                  ? "Listening..."
                  : "—"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SpeechToText;