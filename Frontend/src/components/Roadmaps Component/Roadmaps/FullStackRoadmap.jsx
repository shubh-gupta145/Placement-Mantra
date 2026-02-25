import styles from "./FrontedRoadmap.module.css";
import { Link } from "react-router-dom";

function FullStackRoadmap(){
    return(
        <>
        <div className={styles.Container}>
<div className={styles.Title}>
    Full Stack Developer Roadmap

    <div className={styles.Stage1Container}>
        <h2 className={styles.Steps}>Level 1  Frontend Fundamentals  (Strong UI Foundation)</h2>

        <div className={styles.Details}>
        <h3 className={styles.heading}>HTML, CSS & JavaScript</h3>
        <p className={styles.para}>
        Learn the core building blocks of web development including HTML for structure, CSS for styling, and JavaScript for interactivity.
        </p>
        <ul className={styles.Infolist}>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>Flexbox & Responsive Design</li>
        <li>JavaScript Basics</li>
        <li>DOM Manipulation</li>
        </ul>
        <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}>  
                <a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="html First Video"/></a>
            </div>
            <div className={styles.Video}>  
                <a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="html Second Video"/></a>
            </div>
            <div className={styles.Video}>  
                <a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="html Third Video"/></a>
            </div>
        </div>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Frontend Framework</h3>
        <p className={styles.para}>
        Choose a modern frontend framework to build scalable and dynamic user interfaces.
        </p>
        <ul className={styles.Infolist}>
        <li>React.js</li>
        <li>Components</li>
        <li>Hooks</li>
        <li>State Management</li>
        <li>Routing</li>
        </ul>
        <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="video"/></a></div>
        </div>
        </div>

        <h1 className={styles.Steps}>Level 2  Backend Development</h1>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Node.js + Express.js</h3>
        <p className={styles.para}>
        Build server-side applications and REST APIs using Node.js and Express.js.
        </p>
        <ul className={styles.Infolist}>
        <li>Create Server</li>
        <li>Routing</li>
        <li>Middleware</li>
        <li>REST API</li>
        <li>Error Handling</li>
        </ul>
        <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="video"/></a></div>
        </div>
        </div>

        <h2 className={styles.Steps}>Level 3  Database</h2>

        <div className={styles.Details}>
        <h3 className={styles.heading}>MongoDB & Mongoose</h3>
        <p className={styles.para}>
        Learn how to store, manage, and query data using MongoDB and connect it with backend using Mongoose.
        </p>
        <ul className={styles.Infolist}>
        <li>CRUD Operations</li>
        <li>Schemas & Models</li>
        <li>Validation</li>
        <li>Indexing</li>
        <li>Relationships</li>
        </ul>
        <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="video"/></a></div>
        </div>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Authentication & Security</h3>
        <p className={styles.para}>
        Secure your full stack application using authentication and authorization techniques.
        </p>
        <ul className={styles.Infolist}>
        <li>JWT</li>
        <li>Password Hashing</li>
        <li>Role Based Access</li>
        <li>CORS</li>
        <li>Environment Variables</li>
        </ul>
        <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="video"/></a></div>
        </div>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Full Stack Projects</h3>
        <p className={styles.para}>
        Build complete frontend + backend integrated projects.
        </p>
        <ul className={styles.Infolist}>
        <li>Portfolio Website</li>
        <li>Blog Application</li>
        <li>E-Commerce Website</li>
        <li>Authentication System</li>
        <li>Resume + ATS System</li>
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
        <p className={styles.para}>Frontend Fundamentals + Mini Projects</p>
        <span className={styles.Span}>Month 2</span>
        <p className={styles.para}>Backend + Database Integration</p>
        <span className={styles.Span}>Month 3</span>
        <p className={styles.para}>Complete Full Stack Project</p>

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

export default FullStackRoadmap;