import styles from "./ResultContainer.module.css";
function ResultContainer({result}){

return(

<div className={styles.bodyContainer}>

<div className={styles.ResultContainer}>

<h2 className={styles.ResultTitle}>Test Result</h2>

<div className={styles.ScoreBox}>
<p>Correct Answers</p>
<span>{result.correct}</span>
</div>

<div className={styles.ScoreBox}>
<p>Wrong Answers</p>
<span>{result.wrong}</span>
</div>

<div className={styles.ScoreBox}>
<p>Score</p>
<span>{result.percentage}%</span>
</div>

<button
className={styles.RestartButton}
onClick={()=>window.location.reload()}
>
Start New Test
</button>

</div>

</div>

);

}

export default ResultContainer;