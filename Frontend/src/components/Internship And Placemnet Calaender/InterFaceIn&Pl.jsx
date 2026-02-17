import Calendar from "./Calaender";
import styles from "./InterFaceIn&Pl.module.css";
function InterFaceInPl(){
return(
    <>
    <div className={styles.Container}>
        <Calendar/>
        <div className={styles.Box}>
            <div className={styles.box1}></div>
            <div className={styles.box2}></div>
        </div>
    </div>
    </>
);
}
export default InterFaceInPl;