import styles from "./MockEntry.module.css";
function MockEntry(){
    return(
        <>
        <div className={styles.container}>
<h1 className={styles.heading}>Explore Our Mock Interviews</h1>
<div className={styles.paraContainer}>
<p>Prepare with real-world mock interviews designed by industry experts. 
Boost your confidence, improve communication skills, and get job-ready 
with personalized interview experiences.</p>
</div>
<button className={styles.btn}></button>

        </div>
        </>
    );
}
export default MockEntry;