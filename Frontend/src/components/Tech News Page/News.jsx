import React, { useState } from "react";
import styles from "./News.module.css";

const generateNews = (category) => {
  let newsArray = [];
  for (let i = 1; i <= 15; i++) {
    newsArray.push({
      title: `${category.toUpperCase()} News ${i}`,
      desc: `This is detailed description for ${category} news ${i}.`,
      link: "https://example.com"
    });
  }
  return newsArray;
};

const newsData = {
  it: generateNews("it"),
  job: generateNews("job"),
  ai: generateNews("ai"),
  programming: generateNews("programming")
};

const News = () => {
  const [category, setCategory] = useState("it");
  const [visibleCount, setVisibleCount] = useState(6);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setVisibleCount(6);
  };

  const handleViewMore = () => {
    if (visibleCount < 15) {
      setVisibleCount(visibleCount + 3);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🚀 Tech News Portal</h1>

      {/* NAVIGATION */}
      <div className={styles.nav}>
        <button onClick={() => handleCategoryChange("it")}>I.T News</button>
        <button onClick={() => handleCategoryChange("job")}>Job News</button>
        <button onClick={() => handleCategoryChange("ai")}>A.I News</button>
        <button onClick={() => handleCategoryChange("programming")}>
          Programming News
        </button>
      </div>

      {/* NEWS CARDS */}
      <div className={styles.newsContainer}>
        {newsData[category]
          .slice(0, visibleCount)
          .map((news, index) => (
            <div key={index} className={styles.card}>
              <h3>{news.title}</h3>
              <p>{news.desc}</p>

              <a
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.detailBtn}
              >
                View Details
              </a>
            </div>
          ))}
      </div>

      {/* VIEW MORE BUTTON */}
      {visibleCount < 15 && (
        <div className={styles.viewMoreContainer}>
          <button
            onClick={handleViewMore}
            className={styles.viewMoreBtn}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default News;
