import styles from "./VideoPlaylist.module.css";
function VideoPlaylist(){
    return(
        <>
        <div className={styles.Container}>
<div className={styles.TopicContainer}>
<div className={styles.Topic}>
<span>Roadmaps</span>
</div>
<div className={styles.Topic}>
<span>Profile Management</span>
</div>
<div className={styles.Topic}>
<span>Resume Guidence</span>
</div>
<div className={styles.Topic}>
<span>Machine Learning</span>
</div>
<div className={styles.Topic}>
<span>DSA With Java</span>
</div>
<div className={styles.Topic}>
<span>MERN</span>
</div>
<div className={styles.Topic}>
<span>React</span>
</div>
<div className={styles.Topic}>
<span>Projects</span>
</div>
<div className={styles.Topic}>
<span>Interview In Fanges</span>
</div>
<div className={styles.Topic}>
<span>A.I And A.I Models</span>
</div>
<div className={styles.Topic}>
<span>Prompt Engineering</span>
</div>
<div className={styles.Topic}>
<span>Online Exams</span>
</div>
<div className={styles.Topic}>
<span>Others</span>
</div>
</div>
<div className={styles.VideoContainer}>
<div className={styles.PlaylistContainer}>
    <div className={styles.VidoeInfoContainer}>
      <h1>Title</h1>
<p className={styles.descripition}>Description</p>
<span className={styles.Rating}>Rating</span>  
    </div>

<div className={styles.imageContainer}>
    <img src="" alt="Videothumnail"/>
</div>
</div>
</div>
        </div>
        </>
    );
}
export default VideoPlaylist;