import styles from "./Section.module.css";
import { Link } from "react-router-dom";

function Section() {

  const sections = [
    {
      title: "Roadmaps",
      desc: "In This Page You Will Find Roadmaps For All The Technologies.",
      path: "/Roadmaps"
    },
    {
      title: "Free Courses Playlists",
      desc: "In This Page You Will Find Free Courses Playlists.",
      path: "/FreeCoursePlaylist"
    },
    {
      title: "Internship And Placement",
      desc: "In This Page You Will Find Internship And Placement Details.",
      path: "/Internship"
    },
    {
      title: "Test Your Skill",
      desc: "In this Page You Will Give Tests To Improve Your Skills.",
      path: "/TestInterFace"
    },
    {
      title: "Good CGPA Tricks",
      desc: "In This Page You Will Find Good CGPA Tricks.",
      path: "/CGPA"
    },
    {
      title: "Tech News",
      desc: "In This Page You Will Find Latest Tech News.",
      path: "/TechNewes"
    }
  ];

  return (
    <div className={styles.wrapper_Container}>
      <div className={styles.container}>

        {sections.map((item, index) => (
          <div key={index} className={styles.box1}>
            <h3 className={styles.heading}>{item.title}</h3>
            <p className={styles.para}>{item.desc}</p>

            <Link className={styles.button} to={item.path}>
              Explore Now
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Section;