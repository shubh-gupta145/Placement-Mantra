import { useEffect, useRef } from "react";

const CameraView = ({ interviewState }) => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const startMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        streamRef.current = stream;
        videoRef.current.srcObject = stream;

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

      } catch (err) {
        console.log("Media error:", err);
      }
    };

    startMedia();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const mediaRecorder = mediaRecorderRef.current;

    if (!mediaRecorder) return;

    // START
    if (interviewState === "running") {
      if (mediaRecorder.state !== "recording") {
        mediaRecorder.start();
        console.log("Recording Started");
      }
    }

    // PAUSE
    if (interviewState === "paused") {
      if (mediaRecorder.state === "recording") {
        mediaRecorder.stop();  // audio recording stop
        console.log("Recording Paused");
      }
    }

    // STOP
    if (interviewState === "stopped") {
      if (mediaRecorder.state === "recording") {
        mediaRecorder.stop();
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      console.log("Interview Stopped");
    }

  }, [interviewState]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default CameraView;
