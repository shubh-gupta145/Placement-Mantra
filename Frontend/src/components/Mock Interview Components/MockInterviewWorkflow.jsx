import styles from "./MockInterviewWorkflow.module.css";
function MockInterviewWorkFlow(){
return(
<>
<div className={styles.container}>
        <h1 className={styles.heading}>How Our Software Work</h1>
<div className={styles.subContainer}>
    <p><span className={styles.steps}> Step 1 </span> You Give a Resume To Our Sofware This Step is Optional. You Can Jumped To the Next Step. But If You Give Your Resume So Our System Can Give You a better And more Accurate Answer.</p>
</div>
<div className={styles.subContainer}>
        <p> <span className={styles.steps}> Step 2 </span> You are Give What Job You Apply For And Your Name. This is Necessary If You are not Give Your Resume.And You Also Tell The System Your Time Line This Information is Must Necessary If you already Give Your Resume So PLease Go to the Next Step.</p>
        </div>
<div className={styles.subContainer}>
        <p> <span className={styles.steps}> Step 3 </span> Your Mock Is start. You are only Give the Answer Of MockInterview. Your Answer is Submit to uor system in the Form of Audio So Please Keep your Audio on all time whenever Your Interview is not Finished</p>
</div>
<div className={styles.subContainer}>
        <p><span className={styles.steps}> Step 4 </span> Our System Give You a Result. In this Result We are Provide You Your Score and Mistake And how can you improve this any Many More Details. </p>
</div>
</div>
</>
);
}
export default MockInterviewWorkFlow;