import styles from "./MockInterview.module.css";
import Mic from "./Mic"
import Search_button from "./search_button";
import MockInterviewWorkFlow from "./MockInterviewWorkflow";
function MockInterview(){
    return(
<>
<div className={styles.container}>
  <div className={styles.InfoContainer}>
<h2 className={styles.heading}> What is MockInterview Feature?</h2>
<p>This feature allows you to take a Mock Test powered by our advanced audio analysis algorithm. Once you provide your audio input, the system performs a detailed analysis to identify specific problems and weaknesses in your performance. Based on these findings, our system not only highlights your errors but also provides tailored suggestions on how to solve them. Each result includes a comprehensive breakdown of your marks, specific errors, and actionable suggestions for improvement. This feature is specifically designed to address common challenges faced during mock tests and to significantly boost student confidence.</p>
  </div>
  <MockInterviewWorkFlow/>
  {/* <div className={styles.First_container}>

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
</div> */}
</div>
</>
    );
}
export default MockInterview;