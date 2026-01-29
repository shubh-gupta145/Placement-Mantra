import styles from "./TestPage.module.css";
function TestPage(){
    return(
<>
<div className={styles.Container}>
  <div className={styles.QuestionContainer}>
    <p>Q.1 This is Your Question</p>
  </div>

  <div className={styles.AnswerContainer}>
    <div className={styles.OptionContainer}><span>Option 1</span></div>
    <div className={styles.OptionContainer}><span>Option 2</span></div>
    <div className={styles.OptionContainer}><span>Option 3</span></div>
    <div className={styles.OptionContainer}><span>Option 4</span></div>
  </div>

  {/* Navigation buttons */}
  <div className={styles.Navigation}>
    <div className={styles.LeftButtons}>
      <button>⬅</button>
      <button>⏩</button>
    </div>

    <button className={styles.NextButton}>Next ➡</button>
  </div>
</div>

</>
    );
}
export default TestPage;