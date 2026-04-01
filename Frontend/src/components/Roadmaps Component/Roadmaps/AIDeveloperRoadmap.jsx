import styles from "./FrontedRoadmap.module.css";
import { Link } from "react-router-dom";

function AIDeveloperRoadmap(){
    return(
        <>
        <div className={styles.Container}>
<div className={styles.Title}>
    A.I Developer Roadmap

    <div className={styles.Stage1Container}>
        <h2 className={styles.Steps}>Level 1  Programming & Mathematics Foundation</h2>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Programming Language (Python Recommended)</h3>
        <p className={styles.para}>
        Learn a programming language that is widely used in Artificial Intelligence. Python is the most recommended language for AI development.
        </p>
        <ul className={styles.Infolist}>
        <li>Python Basics</li>
        <li>Data Types</li>
        <li>Loops & Functions</li>
        <li>OOP Concepts</li>
        <li>File Handling</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Mathematics for AI</h3>
        <p className={styles.para}>
        Mathematics is the backbone of Artificial Intelligence. Understanding these concepts helps in building strong ML models.
        </p>
        <ul className={styles.Infolist}>
        <li>Linear Algebra</li>
        <li>Probability</li>
        <li>Statistics</li>
        <li>Calculus Basics</li>
        <li>Matrices & Vectors</li>
        </ul>
        </div>

        <h1 className={styles.Steps}>Level 2  Machine Learning</h1>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Machine Learning Fundamentals</h3>
        <p className={styles.para}>
        Learn how machines learn from data using supervised and unsupervised learning techniques.
        </p>
        <ul className={styles.Infolist}>
        <li>Supervised Learning</li>
        <li>Unsupervised Learning</li>
        <li>Regression</li>
        <li>Classification</li>
        <li>Model Evaluation</li>
        </ul>
        </div>

        <h2 className={styles.Steps}>Level 3  Deep Learning</h2>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Neural Networks</h3>
        <p className={styles.para}>
        Understand how neural networks work and how deep learning models are built.
        </p>
        <ul className={styles.Infolist}>
        <li>Artificial Neural Networks</li>
        <li>Activation Functions</li>
        <li>Backpropagation</li>
        <li>TensorFlow</li>
        <li>PyTorch</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>AI Projects</h3>
        <p className={styles.para}>
        Build real-world AI projects to strengthen your portfolio.
        </p>
        <ul className={styles.Infolist}>
        <li>Chatbot</li>
        <li>Image Classification</li>
        <li>Recommendation System</li>
        <li>Sentiment Analysis</li>
        <li>Resume Screening AI</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>3 Month Plan For You</h3>
        <span className={styles.Span}>Month 1</span>
        <p className={styles.para}>Python + Mathematics Fundamentals</p>
        <span className={styles.Span}>Month 2</span>
        <p className={styles.para}>Machine Learning + Mini Projects</p>
        <span className={styles.Span}>Month 3</span>
        <p className={styles.para}>Deep Learning + Portfolio Project</p>
        </div>

        {/* ========== 6 Suggested Videos - Bottom Section ========== */}
        <div className={styles.Details}>
        <h3 className={styles.heading}>Suggested Videos</h3>
        <p className={styles.para}>Watch these handpicked videos to strengthen your AI development journey from basics to advanced concepts.</p>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="Python Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="Mathematics for AI"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="Machine Learning Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="Deep Learning Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="Neural Networks Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="AI Projects Tutorial"/>
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

export default AIDeveloperRoadmap;