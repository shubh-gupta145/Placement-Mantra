import styles from "./FrontedRoadmap.module.css";
import { Link } from "react-router-dom";

function PythonDeveloperRoadmap(){
    return(
        <>
        <div className={styles.Container}>
<div className={styles.Title}>
    Python Developer Roadmap

    <div className={styles.Stage1Container}>
        <h2 className={styles.Steps}>Level 1  Python Fundamentals</h2>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Core Python Basics</h3>
        <p className={styles.para}>
        Learn the fundamentals of Python programming including syntax, data types, and control structures.
        </p>
        <ul className={styles.Infolist}>
        <li>Variables & Data Types</li>
        <li>Loops & Conditionals</li>
        <li>Functions</li>
        <li>OOP Concepts</li>
        <li>Exception Handling</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Advanced Python</h3>
        <p className={styles.para}>
        Strengthen your Python knowledge with advanced topics and best practices.
        </p>
        <ul className={styles.Infolist}>
        <li>Decorators</li>
        <li>Generators</li>
        <li>File Handling</li>
        <li>Modules & Packages</li>
        <li>Virtual Environments</li>
        </ul>
        </div>

        <h1 className={styles.Steps}>Level 2  Web Development with Python</h1>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Django / Flask</h3>
        <p className={styles.para}>
        Learn backend web development using popular Python frameworks.
        </p>
        <ul className={styles.Infolist}>
        <li>Django Basics</li>
        <li>Flask Basics</li>
        <li>Routing</li>
        <li>Templates</li>
        <li>REST API Development</li>
        </ul>
        </div>

        <h2 className={styles.Steps}>Level 3  Database & APIs</h2>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Database Integration</h3>
        <p className={styles.para}>
        Connect Python applications with databases and build API-based systems.
        </p>
        <ul className={styles.Infolist}>
        <li>SQLite</li>
        <li>MySQL</li>
        <li>PostgreSQL</li>
        <li>ORM Concepts</li>
        <li>API Integration</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Python Projects</h3>
        <p className={styles.para}>
        Build real-world projects to strengthen your portfolio and practical skills.
        </p>
        <ul className={styles.Infolist}>
        <li>Portfolio Website</li>
        <li>Blog Application</li>
        <li>REST API Project</li>
        <li>Authentication System</li>
        <li>Automation Script</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>3 Month Plan For You</h3>
        <span className={styles.Span}>Month 1</span>
        <p className={styles.para}>Python Fundamentals + Mini Projects</p>
        <span className={styles.Span}>Month 2</span>
        <p className={styles.para}>Django / Flask + Database Integration</p>
        <span className={styles.Span}>Month 3</span>
        <p className={styles.para}>Full Backend Project with API</p>
        </div>

        {/* ========== 6 Suggested Videos - Bottom Section ========== */}
        <div className={styles.Details}>
        <h3 className={styles.heading}>Suggested Videos</h3>
        <p className={styles.para}>Watch these handpicked videos to strengthen your Python development journey from basics to advanced concepts.</p>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/watch?v=UrsmFxEIp5k&pp=ygUdcHl0aG9uIHR1dG9yaWFsIGZvciBiZWdpbm5lcnM%3D" target="_main">
                    <img src="./images/Roadmaps/Python Part-1.png" alt="Core Python Basics"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/watch?v=t2_Q2BRzeEE&list=PLGjplNEQ1it8-0CmoljS5yeV-GlKSUEt0&pp=0gcJCbkEOCosWNin" target="_main">
                    <img src="./images/Roadmaps/Python Part-2.png" alt="Advanced Python"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/watch?v=vLqTf2b6GZw&pp=ygUdcHl0aG9uIHR1dG9yaWFsIGZvciBiZWdpbm5lcnM%3D" target="_main">
                    <img src="./images/Roadmaps/Python Part-3.png" alt="Django & Flask Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/watch?v=sCOw5y1RQpY&pp=ygUdcHl0aG9uIHR1dG9yaWFsIGZvciBiZWdpbm5lcnM%3D" target="_main">
                    <img src="./images/Roadmaps/Python Part-4.png" alt="Database Integration"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/watch?v=DWjEqKLDUXQ&pp=ygUdcHl0aG9uIHR1dG9yaWFsIGZvciBiZWdpbm5lcnM%3D" target="_main">
                    <img src="./images/Roadmaps/Python Part-5.png" alt="REST API Development"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/watch?v=XnSasPR2KJI&pp=ygUdcHl0aG9uIHR1dG9yaWFsIGZvciBiZWdpbm5lcnM%3D" target="_main">
                    <img src="./images/Roadmaps/Python Part-6.png" alt="Python Projects"/>
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
<span className={styles.Span}><Link className={styles.Links}to="/FreeCoursePlaylist">Mock InterView</Link></span> 
            </div>
        </div>

        </div>
</div>
        </div>
        </>
    )
}

export default PythonDeveloperRoadmap;