import { useState } from "react";
import styles from "./VideoPlaylist.module.css";
import videoData from "./videoData";
import useFeatureTrack from '../../utils/useFeatureTrack';
function VideoPlaylist() {
 useFeatureTrack('free-resources');
  const topics = Object.keys(videoData);

  const [activeTopic, setActiveTopic] = useState(topics[0]);
  const [visibleCount, setVisibleCount] = useState(4);

  const handleTopicClick = (topic) => {
    setActiveTopic(topic);
    setVisibleCount(4);
  };

  const handleViewMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  return (
    <div className={styles.Container}>

      <div className={styles.TopicContainer}>
        {topics.map((topic, index) => (
          <div
            key={index}
            className={`${styles.Topic} ${
              activeTopic === topic ? styles.Active : ""
            }`}
            onClick={() => handleTopicClick(topic)}
          >
            <span>{topic}</span>
          </div>
        ))}
      </div>

      <div className={styles.VideoContainer}>

        {videoData[activeTopic]
          .slice(0, visibleCount)
          .map((video, index) => (
            <div key={index} className={styles.PlaylistContainer}>

              <div className={styles.VideoInfoContainer}>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <span>⭐ {video.rating}</span>
              </div>

              <div className={styles.imageContainer}>
                <a href={video.link} target="_blank" rel="noopener noreferrer">
                  <img src={video.img} alt="thumbnail" />
                </a>
              </div>

            </div>
        ))}

{visibleCount < videoData[activeTopic].length && (
  <div className={styles.BtnContainer}>
    <button onClick={handleViewMore} className={styles.ViewMoreBtn}>
      View More
    </button>
  </div>
)}

      </div>

    </div>
  );
}

export default VideoPlaylist;