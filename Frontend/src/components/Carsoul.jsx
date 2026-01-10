import styles from "./Carsoul.module.css"
function Carsoul(){
return (
<>
<header>
    <div className={styles.container}>
        <div className={styles.First_container}>
            <h1 className={styles.heading}>Let's Learn Together</h1>
            <p classname={styles.para}>We are here to solve Your All Fresher Related Problem All resourses are free in our Website</p>
            <button className={styles.button}>Let's Start My Juourney</button>
        </div>
        <div className={styles.Second_container}>
            <img src="/images/Carsoul_image1.jpg" className={styles.poster_image} alt="Carsoul_image"/>
        </div>
    </div>
</header>
</>
);
}
export default Carsoul;