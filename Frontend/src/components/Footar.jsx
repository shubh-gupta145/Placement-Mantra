import styles from "./Footar.module.css";    
function Footar(){
    return(
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.subBox1}>
                    <h3>Placement Mantra</h3>
                    <p>Placement Mantra is a platform for students to find internships and jobs. And His Roadmaps</p>
                    <div className={styles.icon_container}>
<i>Linkdin</i>
<i>Instagram</i>
<i>Twitter</i>
<i>Facebook</i>
                    </div>
                    <button>
                        <i>Top Icon</i>
                        <span>Back on Top </span>
                    </button>
                </div>
                <div className={styles.subBox2}>
                    <h5>Website Links </h5>
                    <ul>
                        <li>Home</li>
                        <li>Mocks</li>
                        <li>Weekly Contest</li>
                        <li>ChatBot</li>
                        <li>Roadmaps</li>
                        <li>Log in</li>
                        <li>Internship</li>
                    </ul>
                </div>
                <div className={styles.subBox3}>
                    <h5>Contact us</h5>
                    <ul>
                        <li>Email ID :-- beastboyshubh145@gmail.com</li>
                        <li>Contact Number :-- 8433052037</li>
                        <li>Linkdin ID :--</li>
                    </ul>
                </div>
            </div>
                            <div className={styles.small_container}>
                    <p>© 2024 Placement Mantra. All rights reserved.</p>
                </div>
        </footer>
    );
}
export default Footar;