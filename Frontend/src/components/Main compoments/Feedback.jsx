import { useState } from "react";
import styles from "./Feedback.module.css";

function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [showReply, setShowReply] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!feedback) return;

  try {

    await fetch("http://localhost:5000/api/feedback",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        message: feedback
      })
    });

    setSubmittedData({
      message: feedback
    });

    setShowPopup(true);
    setFeedback("");
    setShowReply(false);

  } catch(error){
    console.log(error);
  }
};

  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        
        {/* LEFT SIDE - FEEDBACK CARD */}
        <div className={styles.card}>
          <h2 className={styles.heading}>Give Your Feedback 💬</h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              placeholder="Please Give your Feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className={styles.input}
            />

            <button type="submit" className={styles.submitBtn}>
              Submit
            </button>
          </form>
        </div>

        {/* RIGHT SIDE - REPLY SECTION */}
        {submittedData && (
          <div className={styles.replySide}>
            <p className={styles.feedbackText}>
              <strong>Your Feedback:</strong> {submittedData.message}
            </p>

            <button
              className={styles.replyBtn}
              onClick={() => setShowReply(true)}
            >
              Show Reply
            </button>

            {showReply && (
              <div className={styles.replyMessage}>
                Thank you for your feedback! We will improve accordingly.
              </div>
            )}
          </div>
        )}
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupBox}>
            <button
              onClick={() => setShowPopup(false)}
              className={styles.closeBtn}
            >
              ✖
            </button>

            <h3 className={styles.popupHeading}>Thank You! ❤️</h3>
            <p className={styles.popupText}>
              We appreciate your valuable feedback.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Feedback;
