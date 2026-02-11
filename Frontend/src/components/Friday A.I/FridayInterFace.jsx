import styles from "./FridayInterFace.module.css";
import { FaPlus } from "react-icons/fa";
function FridayInterFace() {
  return (
    <div className={styles.wrapper}>
        <div className={styles.SettingPannel}> 
<div className={styles.NewChat}>
    <div className={styles.NewChatIcon}>
        <FaPlus className="text-xl" />
    </div>
<span className={styles.text}> New Chat</span>
</div>
<div className={styles.HistoryChats}>
<span className={styles.text}>this is you History</span>
</div>
        </div>
        <div className={styles.OutputPannel}>
      <div className={styles.DisplayScreen}>

      </div>
<div className={styles.InputPannel}>
<div className={styles.InputContainer}>
<input type="text" placeholder="Type your message here..." className={styles.InputBox}/>
</div>
<button className={styles.SendButton}>Send</button>
</div>
        </div>
    </div>
  );
}
export default FridayInterFace;