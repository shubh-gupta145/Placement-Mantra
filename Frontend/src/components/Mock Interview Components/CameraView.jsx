import { useEffect, useRef } from "react";
import styles from "./CameraView.module.css";

const CameraView = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Camera access denied", error);
      }
    }

    startCamera();
  }, []);

  return (
    <div className={styles.cameraContainer}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={styles.video}
      />
    </div>
  );
};

export default CameraView;
