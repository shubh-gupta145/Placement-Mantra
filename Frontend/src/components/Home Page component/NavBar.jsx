import { Link } from "react-router-dom";
import styles from './NavBar.module.css';
function NavBar(){
    return (
<>
<nav>
    <div className={styles.nav_container}>
        <div className={styles.First_nav_container}>        
<Link to="/profile">
  <img
    className={styles.Image}
    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    alt="Placement Mantra Logo"
  />
</Link>
        <Link  className={styles.links} to="/">Home</Link>
        <Link className={styles.links} to="/Mocks">Mocks</Link>
        <Link className={styles.links} to="/CGPA">CGPA</Link>
        <Link className={styles.links} to="/TestInterFace">Tests</Link>
        <Link className={styles.links} to="/about">About Us</Link>
            </div>
            <div className={styles.Second_nav_container}>
            < input className={styles.SearchBar} type="text" placeholder="You are Also Search here"/>
            <Link className={styles.links} to="/SignUp">Sign Up</Link>
            </div>
    </div>
</nav>
</>
    );
}
export default NavBar;