import styles from './NavBar.module.css';
function NavBar(){
    return (
<>
<nav>
    <div className={styles.nav_container}>
        <div className={styles.First_nav_container}>        
        <img src="/" alt="Placement Mantra Logo" />
            <a href="#home">Home</a>
            <a href="#home">Mocks</a>
            <a href="#home">Tests</a>
            <a href="#home">About us</a>
            </div>
            <div className={styles.Second_nav_container}>
            < input type="text" placeholder="You are Also Search here"/>
            <a href=""> Sign up </a>
            </div>
    </div>
</nav>
</>
    );
}
export default NavBar;