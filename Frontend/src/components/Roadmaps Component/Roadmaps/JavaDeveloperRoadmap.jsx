import styles from "./FrontedRoadmap.module.css";
import { Link } from "react-router-dom";

function JavaDeveloperRoadmap(){
    return(
        <>
        <div className={styles.Container}>
<div className={styles.Title}>
    Java Developer Roadmap

    <div className={styles.Stage1Container}>
        <h2 className={styles.Steps}>Level 1  Core Java Fundamentals</h2>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Java Basics</h3>
        <p className={styles.para}>
        Learn the fundamentals of Java programming language and build a strong foundation.
        </p>
        <ul className={styles.Infolist}>
        <li>Variables & Data Types</li>
        <li>Operators</li>
        <li>Loops & Conditionals</li>
        <li>Functions / Methods</li>
        <li>Arrays & Strings</li>
        </ul>
        <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}>  
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="video"/>
                </a>
            </div>
            <div className={styles.Video}>  
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="video"/>
                </a>
            </div>
            <div className={styles.Video}>  
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="video"/>
                </a>
            </div>
        </div>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Object Oriented Programming (OOP)</h3>
        <p className={styles.para}>
        Master the core OOP principles which are essential for Java development.
        </p>
        <ul className={styles.Infolist}>
        <li>Classes & Objects</li>
        <li>Encapsulation</li>
        <li>Inheritance</li>
        <li>Polymorphism</li>
        <li>Abstraction</li>
        </ul>
        <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="video"/></a></div>
        </div>
        </div>

        <h1 className={styles.Steps}>Level 2  Advanced Java</h1>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Collections & Exception Handling</h3>
        <p className={styles.para}>
        Learn advanced Java concepts for writing efficient and scalable programs.
        </p>
        <ul className={styles.Infolist}>
        <li>ArrayList & LinkedList</li>
        <li>HashMap & HashSet</li>
        <li>Exception Handling</li>
        <li>File Handling</li>
        <li>Multithreading</li>
        </ul>
        <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="video"/></a></div>
        </div>
        </div>

        <h2 className={styles.Steps}>Level 3  Java Backend Development</h2>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Spring & Spring Boot</h3>
        <p className={styles.para}>
        Learn how to build enterprise-level backend applications using Spring Framework.
        </p>
        <ul className={styles.Infolist}>
        <li>Spring Core</li>
        <li>Spring Boot</li>
        <li>REST API Development</li>
        <li>JPA & Hibernate</li>
        <li>Security (Spring Security)</li>
        </ul>
        <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="video"/></a></div>
        </div>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Database Integration</h3>
        <p className={styles.para}>
        Connect Java applications with relational databases.
        </p>
        <ul className={styles.Infolist}>
        <li>SQL Basics</li>
        <li>MySQL</li>
        <li>JDBC</li>
        <li>ORM Concepts</li>
        <li>Transactions</li>
        </ul>
        <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="video"/></a></div>
        </div>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Java Projects</h3>
        <p className={styles.para}>
        Build real-world Java backend projects to strengthen your portfolio.
        </p>
        <ul className={styles.Infolist}>
        <li>REST API Project</li>
        <li>Student Management System</li>
        <li>E-Commerce Backend</li>
        <li>Authentication System</li>
        <li>Full Stack Java Project</li>
        </ul>
        <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="video"/></a></div>
        </div>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>3 Month Plan For You</h3>
        <span className={styles.Span}>Month 1</span>
        <p className={styles.para}>Core Java + OOP + DSA Basics</p>
        <span className={styles.Span}>Month 2</span>
        <p className={styles.para}>Advanced Java + Collections + Multithreading</p>
        <span className={styles.Span}>Month 3</span>
        <p className={styles.para}>Spring Boot + Database + Major Project</p>

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
        </div>
        </>
    )
}

export default JavaDeveloperRoadmap;