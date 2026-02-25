import styles from "./FrontedRoadmap.module.css";
import { Link } from "react-router-dom";

function UXDesignerRoadmap(){
    return(
        <>
        <div className={styles.Container}>
<div className={styles.Title}>
    UX Designer Roadmap

    <div className={styles.Stage1Container}>
        <h2 className={styles.Steps}>Level 1  Design Fundamentals</h2>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Design Basics</h3>
        <p className={styles.para}>
        Learn the core principles of design that help create visually appealing and user-friendly interfaces.
        </p>
        <ul className={styles.Infolist}>
        <li>Color Theory</li>
        <li>Typography</li>
        <li>Layout & Spacing</li>
        <li>Visual Hierarchy</li>
        <li>Design Principles</li>
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
        <h3 className={styles.heading}>UX Research</h3>
        <p className={styles.para}>
        Understand user behavior and needs through proper research techniques.
        </p>
        <ul className={styles.Infolist}>
        <li>User Research</li>
        <li>User Personas</li>
        <li>User Journey Mapping</li>
        <li>Competitor Analysis</li>
        <li>Usability Testing</li>
        </ul>
        <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="video"/></a></div>
        </div>
        </div>

        <h1 className={styles.Steps}>Level 2  UI Design Tools</h1>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Design Tools</h3>
        <p className={styles.para}>
        Learn industry-standard tools used for creating wireframes, prototypes, and UI designs.
        </p>
        <ul className={styles.Infolist}>
        <li>Figma</li>
        <li>Adobe XD</li>
        <li>Sketch</li>
        <li>Wireframing</li>
        <li>Prototyping</li>
        </ul>
        <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="video"/></a></div>
        </div>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Interaction Design</h3>
        <p className={styles.para}>
        Focus on improving user interaction and experience through thoughtful design.
        </p>
        <ul className={styles.Infolist}>
        <li>Micro Interactions</li>
        <li>Responsive Design</li>
        <li>Accessibility</li>
        <li>Design Systems</li>
        <li>Usability Principles</li>
        </ul>
        <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="video"/></a></div>
        </div>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>UX Projects</h3>
        <p className={styles.para}>
        Build practical UX case studies and real-world design projects.
        </p>
        <ul className={styles.Infolist}>
        <li>Mobile App Redesign</li>
        <li>Website UX Audit</li>
        <li>Landing Page Design</li>
        <li>Portfolio Case Study</li>
        <li>Prototype Testing</li>
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
        <p className={styles.para}>Design Fundamentals + Basic Projects</p>
        <span className={styles.Span}>Month 2</span>
        <p className={styles.para}>UX Research + Wireframing + Prototyping</p>
        <span className={styles.Span}>Month 3</span>
        <p className={styles.para}>Complete UX Case Study + Portfolio</p>

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
        </div>
        </>
    )
}

export default UXDesignerRoadmap;