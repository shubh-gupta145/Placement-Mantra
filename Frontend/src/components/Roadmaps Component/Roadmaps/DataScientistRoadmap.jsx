import styles from "./FrontedRoadmap.module.css";
import { Link } from "react-router-dom";

function DataScientistRoadmap(){
    return(
        <>
        <div className={styles.Container}>
<div className={styles.Title}>
    Data Scientist Roadmap

    <div className={styles.Stage1Container}>
        <h2 className={styles.Steps}>Level 1  Programming & Data Fundamentals</h2>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Python for Data Science</h3>
        <p className={styles.para}>
        Python is the most widely used language in Data Science. Learn the core libraries used for data analysis and visualization.
        </p>
        <ul className={styles.Infolist}>
        <li>Python Basics</li>
        <li>NumPy</li>
        <li>Pandas</li>
        <li>Matplotlib</li>
        <li>Seaborn</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Mathematics & Statistics</h3>
        <p className={styles.para}>
        Strong understanding of mathematics and statistics is essential for analyzing and interpreting data.
        </p>
        <ul className={styles.Infolist}>
        <li>Linear Algebra</li>
        <li>Probability</li>
        <li>Statistics</li>
        <li>Hypothesis Testing</li>
        <li>Data Distribution</li>
        </ul>
        </div>

        <h1 className={styles.Steps}>Level 2  Data Analysis & Machine Learning</h1>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Data Analysis & Visualization</h3>
        <p className={styles.para}>
        Learn how to clean, process, analyze and visualize data to extract meaningful insights.
        </p>
        <ul className={styles.Infolist}>
        <li>Data Cleaning</li>
        <li>Exploratory Data Analysis (EDA)</li>
        <li>Data Visualization</li>
        <li>Feature Engineering</li>
        <li>SQL for Data Analysis</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Machine Learning Basics</h3>
        <p className={styles.para}>
        Apply machine learning algorithms to make predictions and data-driven decisions.
        </p>
        <ul className={styles.Infolist}>
        <li>Regression</li>
        <li>Classification</li>
        <li>Clustering</li>
        <li>Model Evaluation</li>
        <li>Scikit-Learn</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Data Science Projects</h3>
        <p className={styles.para}>
        Build real-world projects to showcase your data science skills.
        </p>
        <ul className={styles.Infolist}>
        <li>Sales Data Analysis</li>
        <li>Customer Segmentation</li>
        <li>Fraud Detection</li>
        <li>Recommendation System</li>
        <li>Dashboard Project</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>3 Month Plan For You</h3>
        <span className={styles.Span}>Month 1</span>
        <p className={styles.para}>Python + Statistics + Data Analysis Basics</p>
        <span className={styles.Span}>Month 2</span>
        <p className={styles.para}>Machine Learning + EDA Projects</p>
        <span className={styles.Span}>Month 3</span>
        <p className={styles.para}>Complete End-to-End Data Science Project</p>
        </div>

        {/* ========== 6 Suggested Videos - Bottom Section ========== */}
        <div className={styles.Details}>
        <h3 className={styles.heading}>Suggested Videos</h3>
        <p className={styles.para}>Watch these handpicked videos to strengthen your Data Science journey from basics to advanced concepts.</p>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/watch?v=sWhqqiJuypA&pp=ygUWZGF0YSBzY2llbnRpc3QgUm9hZG1hcA%3D%3D" target="_main">
                    <img src="./images/Roadmaps/Data Science Part-1.png" alt="Python for Data Science"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/watch?v=yBcfzZJ-gS8&pp=ygUWZGF0YSBzY2llbnRpc3QgUm9hZG1hcA%3D%3D" target="_main">
                    <img src="./images/Roadmaps/Data Science Part-2.png" alt="Mathematics & Statistics"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/watch?v=05IST7Q1MXY&pp=ygUWZGF0YSBzY2llbnRpc3QgUm9hZG1hcA%3D%3D" target="_main">
                    <img src="./images/Roadmaps/Data Science Part-3.png" alt="Data Analysis & EDA"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/watch?v=9R3X0JoCLyU&pp=ygUWZGF0YSBzY2llbnRpc3QgUm9hZG1hcNIHCQnZCgGHKiGM7w%3D%3D" target="_main">
                    <img src="./images/Roadmaps/Data Science Part-4.png" alt="Machine Learning Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/watch?v=EdUxqVgZ_lA&pp=ygUWZGF0YSBzY2llbnRpc3QgUm9hZG1hcNIHCQnZCgGHKiGM7w%3D%3D" target="_main">
                    <img src="./images/Roadmaps/Data Science Part-5.png" alt="Scikit-Learn Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/watch?v=NUpNoK_5NVs&pp=ygUWZGF0YSBzY2llbnRpc3QgUm9hZG1hcA%3D%3D" target="_main">
                    <img src="./images/Roadmaps/Data Science Part-6.png" alt="Data Science Projects"/>
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

export default DataScientistRoadmap;