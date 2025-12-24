import styles from './NavBar.module.css';
function NavBar(){
    return (
<>
<nav>
    <div className={styles.nav_container}>
        <div className={styles.First_nav_container}>        
        <img src="https://placementmantra.com/assets" alt="Placement Mantra Logo" />
            <a href="#home">Home</a>
            <a href="#home">Mocks</a>
            <a href="#home">Weekly Contest</a>
            <a href="#home">About us</a>
            </div>
            <div className={styles.Second_nav_container}>
            < input type="text" placeholder="You are Also Search here"/>
            <span> Sign up </span>
            </div>
    </div>
</nav>
</>
    );
}
export default NavBar;