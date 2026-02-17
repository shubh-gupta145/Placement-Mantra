import styles from "./VideoPlaylist.module.css";

function VideoPlaylist() {
  return (
    <div className={styles.Container}>
      
      <div className={styles.TopicContainer}>
        {[
          "Roadmaps",
          "Profile Management",
          "Resume Guidance",
          "Machine Learning",
          "DSA With Java",
          "MERN",
          "React",
          "Projects",
          "Interview In Phases",
          "AI & AI Models",
          "Prompt Engineering",
          "Online Exams",
          "Others"
        ].map((topic, index) => (
          <div key={index} className={styles.Topic}>
            <span>{topic}</span>
          </div>
        ))}
      </div>

      <div className={styles.VideoContainer}>
        <div className={styles.PlaylistContainer}>
          
          <div className={styles.VideoInfoContainer}>
            <h2>React Full Course</h2>
            <p className={styles.description}>
              Complete beginner to advanced React playlist.
            </p>
            <span className={styles.Rating}>⭐ 4.8 Rating</span>
          </div>

          <div className={styles.imageContainer}>
            <img
              src="https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg"
              alt="Video thumbnail"
            />
          </div>

        </div>
      </div>

    </div>
  );
}

export default VideoPlaylist;
