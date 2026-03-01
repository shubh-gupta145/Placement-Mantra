import styles from "./MockInterview.module.css";
import Mic from "../Sub Components/Mic";
import Search_button from "../Sub Components/Search_button";
function MockInterview(){
return(
<>
  <div className={styles.MockContainer}>
  <div className={styles.First_container}>
    <div className={styles.micCenter}>
     <Mic/>
    </div>

    <div className={styles.sub_container}>
      <input type="text" placeholder="First Enter your Category" />
      <Search_button />
    </div>

  </div>
<div className={styles.Second_container}>
<p>This is the text of your voice input</p>
</div>
  </div>
  
</>
);
}
export default MockInterview;