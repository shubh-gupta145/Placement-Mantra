import styles from "./FrontedRoadmap.module.css";
import { Link } from "react-router-dom";

function CloudEngineerRoadmap(){
    return(
        <>
        <div className={styles.Container}>
<div className={styles.Title}>
    Cloud Engineer Roadmap

    <div className={styles.Stage1Container}>
        <h2 className={styles.Steps}>Level 1  IT & Networking Fundamentals</h2>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Computer & Networking Basics</h3>
        <p className={styles.para}>
        Understand the fundamentals of computers, operating systems, and networking concepts required for cloud computing.
        </p>
        <ul className={styles.Infolist}>
        <li>Operating Systems (Linux & Windows)</li>
        <li>Networking Basics</li>
        <li>IP Addressing</li>
        <li>DNS</li>
        <li>HTTP / HTTPS</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Linux & Scripting</h3>
        <p className={styles.para}>
        Linux is widely used in cloud environments. Learn command line and basic scripting.
        </p>
        <ul className={styles.Infolist}>
        <li>Linux Commands</li>
        <li>Bash Scripting</li>
        <li>File Permissions</li>
        <li>Process Management</li>
        <li>Shell Automation</li>
        </ul>
        </div>

        <h1 className={styles.Steps}>Level 2  Cloud Platforms</h1>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Major Cloud Providers</h3>
        <p className={styles.para}>
        Learn at least one major cloud platform to deploy and manage applications.
        </p>
        <ul className={styles.Infolist}>
        <li>AWS</li>
        <li>Microsoft Azure</li>
        <li>Google Cloud Platform</li>
        <li>Cloud Services (EC2, S3, VM)</li>
        <li>IAM & Security</li>
        </ul>
        </div>

        <h2 className={styles.Steps}>Level 3  DevOps & Automation</h2>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Containers & CI/CD</h3>
        <p className={styles.para}>
        Learn automation tools and containerization to manage scalable cloud applications.
        </p>
        <ul className={styles.Infolist}>
        <li>Docker</li>
        <li>Kubernetes</li>
        <li>CI/CD Pipelines</li>
        <li>GitHub Actions</li>
        <li>Infrastructure as Code (Terraform)</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>Cloud Projects</h3>
        <p className={styles.para}>
        Build real-world cloud-based projects to gain hands-on experience.
        </p>
        <ul className={styles.Infolist}>
        <li>Deploy Web Application</li>
        <li>CI/CD Pipeline Setup</li>
        <li>Dockerized Application</li>
        <li>Server Monitoring</li>
        <li>Auto Scaling Setup</li>
        </ul>
        </div>

        <div className={styles.Details}>
        <h3 className={styles.heading}>3 Month Plan For You</h3>
        <span className={styles.Span}>Month 1</span>
        <p className={styles.para}>Networking + Linux + Cloud Basics</p>
        <span className={styles.Span}>Month 2</span>
        <p className={styles.para}>Cloud Services + Deployment</p>
        <span className={styles.Span}>Month 3</span>
        <p className={styles.para}>DevOps + Real-World Cloud Project</p>
        </div>

        {/* ========== 6 Suggested Videos - Bottom Section ========== */}
        <div className={styles.Details}>
        <h3 className={styles.heading}>Suggested Videos</h3>
        <p className={styles.para}>Watch these handpicked videos to strengthen your Cloud Engineering journey from basics to advanced concepts.</p>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="Networking Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="Linux Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="AWS Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="Docker Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="Kubernetes Tutorial"/>
                </a>
            </div>
            <div className={styles.Video}>
                <a href="https://www.youtube.com/" target="_main">
                    <img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="Cloud Projects Tutorial"/>
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

export default CloudEngineerRoadmap;