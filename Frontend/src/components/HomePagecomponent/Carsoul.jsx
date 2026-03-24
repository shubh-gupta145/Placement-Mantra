import styles from "./Carsoul.module.css";
import {Link} from "react-router-dom"
function Carsoul(){
return (
<>
<header>
    <div className={styles.container}>
        <div className={styles.First_container}>
            <h1 className={styles.heading}>Let's Learn Together</h1>
            <p className={styles.para}>We are here to solve Your All Fresher Related Problem All resourses are free in our Website</p>
                    <Link  className={styles.links} to="/SignUp">
                    <button className={styles.button}>Let's Start My Juourney</button>
                    </Link>
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