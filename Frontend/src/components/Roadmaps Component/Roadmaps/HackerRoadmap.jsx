import styles from "./FrontedRoadmap.module.css";
import { Link } from "react-router-dom";

function HackerRoadmap(){
    return(
        <>
        <div className={styles.Container}>
<div className={styles.Title}>
    Ethical Hacker Roadmap

    <div className={styles.Stage1Container}>
        <h2 className={styles.Steps}>Level 1  Computer & Networking Fundamentals</h2>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Computer Basics</h3>
        <p className={styles.para}>
        Understand how computers work including operating systems, memory, processes and file systems.
        </p>
        <ul className={styles.Infolist}>
        <li>Operating Systems</li>
        <li>Linux Basics</li>
        <li>Command Line</li>
        <li>File Systems</li>
        <li>Processes & Threads</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Networking Fundamentals</h3>
        <p className={styles.para}>
        Networking knowledge is essential for ethical hacking and penetration testing.
        </p>
        <ul className={styles.Infolist}>
        <li>OSI Model</li>
        <li>TCP/IP</li>
        <li>DNS</li>
        <li>HTTP / HTTPS</li>
        <li>Ports & Protocols</li>
        </ul>
        </div>

        <h1 className={styles.Steps}>Level 2  Cyber Security Core</h1>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Security Basics</h3>
        <p className={styles.para}>
        Learn the fundamentals of cyber security and common vulnerabilities.
        </p>
        <ul className={styles.Infolist}>
        <li>CIA Triad</li>
        <li>Encryption & Hashing</li>
        <li>Firewalls</li>
        <li>Malware Types</li>
        <li>Social Engineering</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Penetration Testing</h3>
        <p className={styles.para}>
        Learn how to ethically test systems for vulnerabilities.
        </p>
        <ul className={styles.Infolist}>
        <li>Reconnaissance</li>
        <li>Scanning</li>
        <li>Enumeration</li>
        <li>Exploitation Basics</li>
        <li>Reporting</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Tools & Platforms</h3>
        <p className={styles.para}>
        Get hands-on experience with common ethical hacking tools.
        </p>
        <ul className={styles.Infolist}>
        <li>Kali Linux</li>
        <li>Wireshark</li>
        <li>Nmap</li>
        <li>Metasploit</li>
        <li>Burp Suite</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>3 Month Plan For You</h3>
        <span className={styles.Span}>Month 1</span>
        <p className={styles.para}>Linux + Networking Fundamentals</p>
        <span className={styles.Span}>Month 2</span>
        <p className={styles.para}>Cyber Security Concepts + Tools Practice</p>
        <span className={styles.Span}>Month 3</span>
        <p className={styles.para}>Hands-on Labs + Capture The Flag Practice</p>
        </div>

        {/* ========== 6 Suggested Videos - Bottom Section ========== */}
        <div className={styles.Details}>
        <h3 className={styles.heading}>Suggested Videos</h3>
        <p className={styles.para}>Watch these handpicked videos to strengthen your Ethical Hacking journey from basics to advanced concepts.</p>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="Computer Basics Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="Networking Fundamentals"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="Cyber Security Basics"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="Penetration Testing Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="Kali Linux & Tools"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="Ethical Hacking Projects"/>
                </a>
            </div>
        </div>
        </div>

        {/* ========== Also Try This Section ========== */}
        <div className={styles.OurContainer}>
            <div className={styles.headingContainer}>
                <h2 className={styles.heading}>Also Try This</h2>
            </div>
            <div className={styles.ResourcesContainer}>
                <span className={styles.Span}><Link className={styles.Links} to="/FreeCoursePlaylist">Our Resources</Link></span>
                <span className={styles.Span}><Link className={styles.Links} to="/FreeCoursePlaylist">Test Your Skill</Link></span>
                <span className={styles.Span}><Link className={styles.Links} to="/FreeCoursePlaylist">Mock InterView</Link></span> 
            </div>
        </div>

        </div>
</div>
        </div>
        </>
    )
}

export default HackerRoadmap;