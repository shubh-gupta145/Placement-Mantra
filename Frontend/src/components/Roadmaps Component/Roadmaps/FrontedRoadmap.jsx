import styles from "./FrontedRoadmap.module.css";
import { Link } from "react-router-dom";
function FrontedRoadmap(){
    return(
        <>
        <div className={styles.Container}>
<div className={styles.Title}>
    Fronted Developer Roadmap
    <div className={styles.Stage1Container}>
        <h2 className={styles.Steps}>Level 1  Fundamentals  (Strong Foundation)  </h2>
        <div className={styles.Details}>
        <h3 className={styles.heading}>HTML</h3>
        < p  className={styles.para}>
        HTML (HyperText Markup Language) is a markup language used to create web pages.It defines the structure of a web page, such as headings, paragraphs, images, and links.</ p >
        <ul className={styles.Infolist}>
        <li>Semantic tags</li>
        <li>Forms</li>
        <li>Tables</li>
        <li>Audio / Video</li>
        <li>Accessibility basics</li>
        </ul>
        <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=HcOc7P5BMi4&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i" target="_main"><img src="./images/RoadMap Images/Apna College Html.png" alt="html First Video"/></a>
            </div>
            <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=rklidcZ-aLU&t=1185s&pp=ygUHaHRtbCB0dQ%3D%3D" target="_main"><img src="./images/RoadMap Images/KGCoding html.png" alt="html Second Video"/></a>
            </div>
             <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=-G7bJVAIiEI&t=212s&pp=ygUHaHRtbCB0dQ%3D%3D" target="_main"><img src="./images/RoadMap Images/html3.png" alt="html Third Video"/></a>
            </div>
        </div>
        </div>
                <div className={styles.Details}>
        <h3 className={styles.heading}>CSS</h3>
        <p className={styles.para}>CSS (Cascading Style Sheets) is a stylesheet language used to control the appearance and layout of web pages.</ p >
        <ul className={styles.Infolist}>
        <li>Box model</li>
        <li>Flexbox</li>
        <li>Grid</li>
        <li>Responsive design</li>
        <li>Accessibility basics</li>
        <li>Animations</li>
        <li>Positions</li>
        </ul>
                <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=OpWjt_wbV4E&t=973s&pp=ygUMY3NzIHR1dG9yaWFs" target="_main"><img src="./images/RoadMap Images/CSS1.png" alt="html First Video"/></a>
            </div>
            <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=ESnrn1kAD4E&pp=ygUMY3NzIHR1dG9yaWFs" target="_main"><img src="./images/RoadMap Images/CSS2.png" alt="html Second Video"/></a>
            </div>
             <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=Edsxf_NBFrw&pp=ygUMY3NzIHR1dG9yaWFs" target="_main"><img src="./images/RoadMap Images/CSS3.png" alt="html Third Video"/></a>
            </div>
        </div>
        </div>
                <div className={styles.Details}>
        <h3 className={styles.heading}>JavaScript</h3>
        < p className={styles.para}>JavaScript is a programming language that enables interactive web pages. It is an essential part of web applications and is used to create dynamic content.</ p >
        <ul className={styles.Infolist}>
        <li>Functions</li>
        <li>Variables</li>
        <li>Data Types</li>
        <li>DOM Manipulation</li>
        <li>Objects</li>
        <li>Arrays</li>
        </ul>
                <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=HcOc7P5BMi4&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i" target="_main"><img src="./images/RoadMap Images/CSS3.png" alt="html First Video"/></a>
            </div>
            <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=k2DSi1zGEc8&pp=ygUEaHRtbA%3D%3D" target="_main"><img src="./images/RoadMap Images/CSS3.png" alt="html Second Video"/></a>
            </div>
             <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=rklidcZ-aLU&pp=ygUEaHRtbA%3D%3D" target="_main"><img src="./images/RoadMap Images/CSS3.png" alt="html Third Video"/></a>
            </div>
        </div>
        </div>
        <h2 className={styles.Steps}>Level 2  Advanced Concepts (Building Expertise) </h2>
                <div className={styles.Details}>
        <h3 className={styles.heading}>Git Hub</h3>
        < p className={styles.para} >Git is a distributed version control system that tracks changes in files and coordinates work among multiple developers.</ p >
        <ul className={styles.Infolist}>
        <li>Repository</li>
        <li>Branching</li>
        <li>Merging</li>
        <li>Cloning</li>
        <li>Committing</li>
        </ul>
                <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=HcOc7P5BMi4&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i" target="_main"><img src="./images/RoadMap Images/CSS3.png" alt="html First Video"/></a>
            </div>
            <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=k2DSi1zGEc8&pp=ygUEaHRtbA%3D%3D" target="_main"><img src="./images/RoadMap Images/CSS3.png" alt="html Second Video"/></a>
            </div>
             <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=rklidcZ-aLU&pp=ygUEaHRtbA%3D%3D" target="_main"><img src="./images/RoadMap Images/CSS3.png" alt="html Third Video"/></a>
            </div>
        </div>
        </div>
                <div className={styles.Details}>
        <h3 className={styles.heading}>React</h3>
        < p className={styles.para} >React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage the state of an application efficiently.</ p >
        <ul className={styles.Infolist}>
        <li>Components</li>
        <li>Props</li>
        <li>State</li>
        <li>Advanced Hooks</li>
        <li>Context API</li>
        </ul>
                <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=HcOc7P5BMi4&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i" target="_main"><img src="./images/RoadMap Images/CSS3.png" alt="html First Video"/></a>
            </div>
            <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=k2DSi1zGEc8&pp=ygUEaHRtbA%3D%3D" target="_main"><img src="./images/RoadMap Images/CSS3.png" alt="html Second Video"/></a>
            </div>
             <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=rklidcZ-aLU&pp=ygUEaHRtbA%3D%3D" target="_main"><img src="./images/RoadMap Images/CSS3.png" alt="html Third Video"/></a>
            </div>
        </div>
        </div>
                <div className={styles.Details}>
        <h3 className={styles.heading}>Advanced CSS Library and Frameworks</h3>
        < p className={styles.para} >Advanced CSS libraries and frameworks like Bootstrap, Tailwind CSS, and Material UI help developers build responsive and visually appealing user interfaces more efficiently.</ p >
        <ul className={styles.Infolist}>
        <li>BootStrap</li>
        <li>Tailwind CSS</li>
        <li>Material UI</li>
        <li>UI Design Principles</li>
        <li>Use of CSS Variables</li>
        </ul>
                <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=HcOc7P5BMi4&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i" target="_main"><img src="./images/RoadMap Images/CSS3.png" alt="html First Video"/></a>
            </div>
            <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=k2DSi1zGEc8&pp=ygUEaHRtbA%3D%3D" target="_main"><img src="./images/RoadMap Images/CSS3.png" alt="html Second Video"/></a>
            </div>
             <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=rklidcZ-aLU&pp=ygUEaHRtbA%3D%3D" target="_main"><img src="./images/RoadMap Images/CSS3.png" alt="html Third Video"/></a>
            </div>
        </div>
        </div>
                <div className={styles.Details}>
        <h3 className={styles.heading}>Frontend Projects</h3>
        < p className={styles.para} >Complete hands-on projects to build a strong portfolio and gain practical experience in frontend development.</ p >
        <ul className={styles.Infolist}>
        <li>Clone Projects</li>
        <li>Responsive Design</li>
        <li>Todo App</li>
        <li>Calculator</li>
        <li>Snake Game</li>
            <li>Weather App</li>
            <li>Tic Tac Toe</li>
            </ul>
                <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=HcOc7P5BMi4&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i" target="_main"><img src="./images/RoadMap Images/CSS3.png" alt="html First Video"/></a>
            </div>
            <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=k2DSi1zGEc8&pp=ygUEaHRtbA%3D%3D" target="_main"><img src="./images/RoadMap Images/CSS3.png" alt="html Second Video"/></a>
            </div>
             <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=rklidcZ-aLU&pp=ygUEaHRtbA%3D%3D" target="_main"><img src="./images/RoadMap Images/CSS3.png" alt="html Third Video"/></a>
            </div>
        </div>
        </div>
                <div className={styles.Details}>
        <h3 className={styles.heading}>Bonus Learnings</h3>
        < p className={styles.para} >These are additional skills and knowledge areas that complement core frontend development.</ p >
        <ul className={styles.Infolist}>
        <li>Type Script</li>
        <li>Next.js</li>
        <li>Framer Motion</li>
        <li>Web Performance</li>
        <li>Accessibility</li>
            </ul>
                <span className={styles.Span}>Suggested Video</span>
        <div className={styles.VideoContainer}>
            <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=HcOc7P5BMi4&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i" target="_main"><img src="./images/FrontedRoadmap Thumbail/ApnaCollege.png" alt="html First Video"/></a>
            </div>
            <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=k2DSi1zGEc8&pp=ygUEaHRtbA%3D%3D" target="_main"><img src="./images/FrontedRoadmap Thumbail/CodeWithHarry.png" alt="html Second Video"/></a>
            </div>
             <div className={styles.Video}>  
                <a href="https://www.youtube.com/watch?v=rklidcZ-aLU&pp=ygUEaHRtbA%3D%3D" target="_main"><img src="./images/FrontedRoadmap Thumbail/KgCoding.png" alt="html Third Video"/></a>
            </div>
        </div>
        </div>
                <div className={styles.Details}>
        <h3 className={styles.heading}>3 Month Plan For You</h3>
        <span className={styles.Span}>Month 1</span>
        < p className={styles.para} >JS + Advanced JS + 3 Projects</ p >
        <span className={styles.Span}>Month 2</span>
        < p className={styles.para} >React + GitHub + 3 Projects</ p >
        <span className={styles.Span}>Month 3</span>
        < p className={styles.para} >Advanced React + Portfolio Project</ p >
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
    );
}
export default FrontedRoadmap;