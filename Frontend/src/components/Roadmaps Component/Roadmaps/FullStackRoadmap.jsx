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
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>3 Month Plan For You</h3>
        <span className={styles.Span}>Month 1</span>
        <p className={styles.para}>Frontend Fundamentals + Mini Projects</p>
        <span className={styles.Span}>Month 2</span>
        <p className={styles.para}>Backend + Database Integration</p>
        <span className={styles.Span}>Month 3</span>
        <p className={styles.para}>Complete Full Stack Project</p>
        </div>

        {/* ========== 6 Suggested Videos - Bottom Section ========== */}
        <div className={styles.Details}>
        <h3 className={styles.heading}>Suggested Videos</h3>
        <p className={styles.para}>Watch these handpicked videos to strengthen your Full Stack development journey from basics to advanced concepts.</p>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/watch?v=eILUmCJhl64&t=16378s&pp=ygUbUmVhY3QgdHV0b3JpYWwgYnkga2cgY29kaW5n0gcJCdkKAYcqIYzv" target="_main">
                    <img src="./images/Roadmaps/Frontend Part-4.png" alt="Git Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                  <a href="https://www.youtube.com/watch?v=Ez8F0nW6S-w&pp=ygUPZ2l0aHViIHR1dG9yaWFs" target="_main">
                    <img src="./images/Roadmaps/Frontend Part-5.png" alt="React Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/watch?v=AZzV3wZCvI4&list=PL78RhpUUKSwfeSOOwfE9x6l5jTjn5LbY3" target="_main"><img src="./images/Roadmaps/Backend Part-1.png" alt="Video 1"/></a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/watch?v=ExcRbA7fy_A&list=PL4cUxeGkcC9h77dJ-QJlwGlZlTd4ecZOA&pp=0gcJCbkEOCosWNin" target="_main">
                    <img src="./images/Roadmaps/FullStack Part-1.png" alt="MongoDB Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/watch?v=ajdRvxDWH4w&list=PLGjplNEQ1it_oTvuLRNqXfz_v_0pq6unW" target="_main">
                    <img src="./images/Roadmaps/Frontend Part-3.png" alt="JavaScript Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/watch?v=IzZYgMawnpk&pp=ygUZZnVsbCBzdGFjayBwcm9qZWN0cyBpZGVhcw%3D%3D" target="_main">
                    <img src="./images/Roadmaps/FullStack Part-2.png" alt="Full Stack Projects"/>
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

export default FullStackRoadmap;