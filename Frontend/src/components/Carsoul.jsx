import styles from "./Carsoul.module.css"
function Carsoul(){
return (
<>
<header>
    <div className={styles.container}>
        <div className={styles.First_container}>
            <h1 className={styles.heading}>Let's Learn Together</h1>
            <p>We are here to solve Your All Fresher Related Problem All resourses are free in our Website</p>
            <button>Let's Start My Juorney</button>
        </div>
        <div className={styles.Second_container}>
            <img src="/images/Carsoul_image1.jpg" alt="Carsoul_image"/>
        </div>
    </div>
</header>
</>
);
}
export default Carsoul;