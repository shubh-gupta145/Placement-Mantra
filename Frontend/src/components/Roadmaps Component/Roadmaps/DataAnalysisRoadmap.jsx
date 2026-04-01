import styles from "./FrontedRoadmap.module.css";
import { Link } from "react-router-dom";

function DataAnalyticsRoadmap(){
    return(
        <>
        <div className={styles.Container}>
<div className={styles.Title}>
    Data Analytics Roadmap

    <div className={styles.Stage1Container}>
        <h2 className={styles.Steps}>Level 1  Foundation (Programming + Basics)</h2>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Python / Excel Basics</h3>
        <p className={styles.para}>
        Start with the fundamentals of data handling using Python and Excel. Learn how to clean, organize, and manipulate datasets.
        </p>
        <ul className={styles.Infolist}>
        <li>Python Basics</li>
        <li>Excel Formulas</li>
        <li>Data Cleaning</li>
        <li>Data Types</li>
        <li>Basic Statistics</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>SQL for Data Analysis</h3>
        <p className={styles.para}>
        Learn how to query and manage data using SQL. This is one of the most important skills for Data Analysts.
        </p>
        <ul className={styles.Infolist}>
        <li>SELECT Statements</li>
        <li>WHERE, GROUP BY</li>
        <li>JOIN</li>
        <li>Subqueries</li>
        <li>Aggregations</li>
        </ul>
        </div>

        <h1 className={styles.Steps}>Level 2  Data Analysis & Visualization</h1>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Data Analysis Libraries</h3>
        <p className={styles.para}>
        Use Python libraries to analyze datasets and extract insights.
        </p>
        <ul className={styles.Infolist}>
        <li>Pandas</li>
        <li>NumPy</li>
        <li>Matplotlib</li>
        <li>Seaborn</li>
        <li>Exploratory Data Analysis (EDA)</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Visualization Tools</h3>
        <p className={styles.para}>
        Create dashboards and visual reports to communicate insights effectively.
        </p>
        <ul className={styles.Infolist}>
        <li>Power BI</li>
        <li>Tableau</li>
        <li>Google Data Studio</li>
        <li>Dashboard Design</li>
        <li>Data Storytelling</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Data Analytics Projects</h3>
        <p className={styles.para}>
        Work on real-world datasets to gain practical experience.
        </p>
        <ul className={styles.Infolist}>
        <li>Sales Dashboard</li>
        <li>Customer Analysis</li>
        <li>Market Trend Analysis</li>
        <li>Business KPI Dashboard</li>
        <li>Data Cleaning Project</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>3 Month Plan For You</h3>
        <span className={styles.Span}>Month 1</span>
        <p className={styles.para}>Python + Excel + SQL Fundamentals</p>
        <span className={styles.Span}>Month 2</span>
        <p className={styles.para}>Data Analysis + Visualization Tools</p>
        <span className={styles.Span}>Month 3</span>
        <p className={styles.para}>End-to-End Analytics Project + Dashboard</p>
        </div>

        {/* ========== 6 Suggested Videos - Bottom Section ========== */}
        <div className={styles.Details}>
        <h3 className={styles.heading}>Suggested Videos</h3>
        <p className={styles.para}>Watch these handpicked videos to strengthen your Data Analytics journey from basics to advanced concepts.</p>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="Python Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="Excel Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="SQL Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="Pandas & NumPy Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="Power BI Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="Data Analytics Projects"/>
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

export default DataAnalyticsRoadmap;