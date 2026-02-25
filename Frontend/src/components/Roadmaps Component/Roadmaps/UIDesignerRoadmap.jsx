import styles from "./FrontedRoadmap.module.css";
import { Link } from "react-router-dom";

function UIDesignerRoadmap(){
    return(
        <>
        <div className={styles.Container}>
<div className={styles.Title}>
    UI Designer Roadmap

    <div className={styles.Stage1Container}>
        <h2 className={styles.Steps}>Level 1  Design Foundations</h2>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Design Principles</h3>
        <p className={styles.para}>
        Learn the fundamental principles of visual design to create clean and user-friendly interfaces.
        </p>
        <ul className={styles.Infolist}>
        <li>Color Theory</li>
        <li>Typography</li>
        <li>Layout & Spacing</li>
        <li>Contrast & Hierarchy</li>
        <li>Design Consistency</li>
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
        <h3 className={styles.heading}>Design Tools</h3>
        <p className={styles.para}>
        Master modern UI design tools used in the industry.
        </p>
        <ul className={styles.Infolist}>
        <li>Figma</li>
        <li>Adobe XD</li>
        <li>Sketch</li>
        <li>Canva</li>
        <li>Wireframing Tools</li>
        </ul>
        <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="video"/></a></div>
        </div>
        </div>

        <h1 className={styles.Steps}>Level 2  UI Design Process</h1>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Wireframing & Prototyping</h3>
        <p className={styles.para}>
        Learn how to create wireframes and interactive prototypes before development.
        </p>
        <ul className={styles.Infolist}>
        <li>Low-Fidelity Wireframes</li>
        <li>High-Fidelity Designs</li>
        <li>Interactive Prototypes</li>
        <li>User Flows</li>
        <li>Design Systems</li>
        </ul>
        <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="video"/></a></div>
        </div>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Responsive Design</h3>
        <p className={styles.para}>
        Design interfaces that work perfectly across different devices and screen sizes.
        </p>
        <ul className={styles.Infolist}>
        <li>Mobile First Design</li>
        <li>Grid Systems</li>
        <li>Breakpoints</li>
        <li>Adaptive Layouts</li>
        <li>Accessibility Basics</li>
        </ul>
        <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="video"/></a></div>
            <div className={styles.Video}><a href="https://www.youtube.com/" target="_main"><img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="video"/></a></div>
        </div>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>UI Projects</h3>
        <p className={styles.para}>
        Build real-world UI design projects to create a strong portfolio.
        </p>
        <ul className={styles.Infolist}>
        <li>Landing Page Design</li>
        <li>Mobile App UI</li>
        <li>Dashboard UI</li>
        <li>E-commerce UI</li>
        <li>Portfolio Website Design</li>
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
        <p className={styles.para}>Design Principles + Tool Mastery</p>
        <span className={styles.Span}>Month 2</span>
        <p className={styles.para}>Wireframing + Responsive Design</p>
        <span className={styles.Span}>Month 3</span>
        <p className={styles.para}>Portfolio Projects + Case Studies</p>

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

export default UIDesignerRoadmap;