import React, { useState, useEffect } from "react";
import styles from "./News.module.css";
import useFeatureTrack from '../../utils/useFeatureTrack';
import Friday from "../Friday A.I/Friday";
import axios from "../../axios.js";

const CATEGORIES = [
  { label: "All Tech",   q: "technology",              emoji: "⚡" },
  { label: "AI",         q: "artificial intelligence", emoji: "🤖" },
  { label: "Startups",   q: "startup funding",         emoji: "🚀" },
  { label: "Cybersec",   q: "cybersecurity",           emoji: "🔐" },
  { label: "Dev",        q: "software developer",      emoji: "💻" },
  { label: "Jobs",       q: "tech jobs hiring",        emoji: "💼" },
];

const readTime = (text) => {
  if (!text) return "2 min";
  const words = text.split(" ").length;
  return Math.max(1, Math.ceil(words / 200)) + " min";
};

const timeAgo = (dateStr) => {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return "Just now";
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

const News = () => {
  useFeatureTrack('it-news');
  const [newsData, setNewsData]         = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [activeCategory, setActiveCategory] = useState(0);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(false);

  const fetchNews = async (query) => {
    setLoading(true);
    setError(false);
    setVisibleCount(9);
    try {
      // ✅ Ab directly gnews.io call nahi hogi
      // Frontend → Tera Backend → GNews/NewsData
      // No CORS issues — local aur production dono pe kaam karega
      const res = await axios.get(`/api/news?q=${encodeURIComponent(query)}`);

      if (res.data.articles && res.data.articles.length > 0) {
        setNewsData(res.data.articles);
      } else {
        setNewsData([]);
        setError(true);
      }
    } catch (err) {
      console.error("News fetch error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(CATEGORIES[activeCategory].q);
  }, [activeCategory]);

  return (
    <div className={styles.container}>

      {/* ── HERO ── */}
      <div className={styles.hero}>
        <span className={styles.heroBadge}>LIVE FEED</span>
        <h1 className={styles.heroTitle}>Tech<span>Pulse</span></h1>
        <p className={styles.heroSub}>Stay ahead — curated tech news, AI breakthroughs & career intel</p>
      </div>

      {/* ── CATEGORY TABS ── */}
      <div className={styles.tabs}>
        {CATEGORIES.map((cat, i) => (
          <button
            key={i}
            className={`${styles.tab} ${activeCategory === i ? styles.tabActive : ""}`}
            onClick={() => setActiveCategory(i)}
          >
            <span>{cat.emoji}</span> {cat.label}
          </button>
        ))}
      </div>

      {/* ── GRID ── */}
      {loading ? (
        <div className={styles.loadingGrid}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.skeleton}>
              <div className={styles.skelImg} />
              <div className={styles.skelLine} style={{ width: "80%" }} />
              <div className={styles.skelLine} style={{ width: "60%" }} />
              <div className={styles.skelLine} style={{ width: "40%" }} />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className={styles.errorBox}>
          <p>⚠️ Could not load news. Check your connection and try again.</p>
          <button
            className={styles.retryBtn}
            onClick={() => fetchNews(CATEGORIES[activeCategory].q)}
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {newsData.slice(0, visibleCount).map((article, i) => (
              <a
                key={i}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.card} ${i === 0 ? styles.cardFeatured : ""}`}
              >
                {article.image && (
                  <div className={styles.cardImg}>
                    <img src={article.image} alt={article.title} loading="lazy" />
                    <div className={styles.cardImgOverlay} />
                  </div>
                )}

                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span className={styles.source}>
                      {article.source?.name || "News"}
                    </span>
                    <span className={styles.dot}>·</span>
                    <span className={styles.time}>{timeAgo(article.publishedAt)}</span>
                    <span className={styles.dot}>·</span>
                    <span className={styles.readTime}>⏱ {readTime(article.description)}</span>
                  </div>

                  <h3 className={styles.cardTitle}>{article.title}</h3>

                  {article.description && (
                    <p className={styles.cardDesc}>{article.description}</p>
                  )}

                  <div className={styles.cardFooter}>
                    <span className={styles.readMore}>Read article →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {visibleCount < newsData.length && (
            <div className={styles.viewMoreWrap}>
              <button
                className={styles.viewMoreBtn}
                onClick={() => setVisibleCount(v => v + 6)}
              >
                Load more stories
              </button>
            </div>
          )}
        </>
      )}

      <Friday />
    </div>
  );
};

export default News;