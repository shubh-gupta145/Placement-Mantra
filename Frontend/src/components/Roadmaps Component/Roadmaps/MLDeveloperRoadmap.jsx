import styles from "./FrontedRoadmap.module.css";
import { Link } from "react-router-dom";

function MLDeveloperRoadmap(){
    return(
        <>
        <div className={styles.Container}>
<div className={styles.Title}>
    Machine Learning Developer Roadmap

    <div className={styles.Stage1Container}>
        <h2 className={styles.Steps}>Level 1  Programming & Math Foundation</h2>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Python Programming</h3>
        <p className={styles.para}>
        Python is the most widely used language in Machine Learning. Learn core programming concepts and libraries.
        </p>
        <ul className={styles.Infolist}>
        <li>Python Basics</li>
        <li>OOP Concepts</li>
        <li>NumPy</li>
        <li>Pandas</li>
        <li>Matplotlib</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Mathematics for ML</h3>
        <p className={styles.para}>
        Mathematics plays a key role in understanding machine learning algorithms.
        </p>
        <ul className={styles.Infolist}>
        <li>Linear Algebra</li>
        <li>Probability</li>
        <li>Statistics</li>
        <li>Calculus Basics</li>
        <li>Vectors & Matrices</li>
        </ul>
        </div>

        <h1 className={styles.Steps}>Level 2  Machine Learning Core</h1>

        <div className={styles.Details}>
        <h3 className={styles.heading}>ML Algorithms</h3>
        <p className={styles.para}>
        Learn fundamental machine learning algorithms and when to use them.
        </p>
        <ul className={styles.Infolist}>
        <li>Linear Regression</li>
        <li>Logistic Regression</li>
        <li>Decision Trees</li>
        <li>K-Nearest Neighbors</li>
        <li>Support Vector Machine</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Model Evaluation & Optimization</h3>
        <p className={styles.para}>
        Learn how to evaluate and improve your machine learning models.
        </p>
        <ul className={styles.Infolist}>
        <li>Train-Test Split</li>
        <li>Cross Validation</li>
        <li>Confusion Matrix</li>
        <li>Overfitting & Underfitting</li>
        <li>Hyperparameter Tuning</li>
        </ul>
        </div>

        <h2 className={styles.Steps}>Level 3  Deep Learning & Projects</h2>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Deep Learning Basics</h3>
        <p className={styles.para}>
        Understand neural networks and deep learning frameworks.
        </p>
        <ul className={styles.Infolist}>
        <li>Neural Networks</li>
        <li>Activation Functions</li>
        <li>Backpropagation</li>
        <li>TensorFlow</li>
        <li>PyTorch</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>ML Projects</h3>
        <p className={styles.para}>
        Build real-world machine learning projects for strong portfolio.
        </p>
        <ul className={styles.Infolist}>
        <li>House Price Prediction</li>
        <li>Spam Detection</li>
        <li>Stock Price Prediction</li>
        <li>Customer Segmentation</li>
        <li>Resume Screening Model</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>3 Month Plan For You</h3>
        <span className={styles.Span}>Month 1</span>
        <p className={styles.para}>Python + Mathematics</p>
        <span className={styles.Span}>Month 2</span>
        <p className={styles.para}>Machine Learning Algorithms + Mini Projects</p>
        <span className={styles.Span}>Month 3</span>
        <p className={styles.para}>Deep Learning + Final Portfolio Project</p>
        </div>

        {/* ========== 6 Suggested Videos - Bottom Section ========== */}
        <div className={styles.Details}>
        <h3 className={styles.heading}>Suggested Videos</h3>
        <p className={styles.para}>Watch these handpicked videos to strengthen your Machine Learning journey from basics to advanced concepts.</p>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="Python Programming Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="Mathematics for ML"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="ML Algorithms Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="Model Evaluation & Optimization"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="Deep Learning Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="ML Projects"/>
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

export default MLDeveloperRoadmap;