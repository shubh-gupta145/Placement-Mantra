import React, { useState, useEffect } from "react";
import styles from "./News.module.css";
import useFeatureTrack from '../../utils/useFeatureTrack';
const News = () => {
useFeatureTrack('it-news');
const [newsData,setNewsData] = useState([]);
const [visibleCount,setVisibleCount] = useState(6);

const fetchNews = async ()=>{

try{

const res = await fetch(
"https://newsdata.io/api/1/news?apikey=pub_2606e08bafc249ca83b78136a93a0155&q=technology&language=en"
);

const data = await res.json();

if(Array.isArray(data.results)){
setNewsData(data.results);
}else{
setNewsData([]);
}

}catch(err){
console.log("API Error:",err);
}

};

useEffect(()=>{
fetchNews();
},[]);

const handleViewMore = ()=>{
setVisibleCount((prev)=>prev + 3);
};

return(

<div className={styles.container}>

<h1 className={styles.title}>🚀 Tech News Portal</h1>

<div className={styles.newsContainer}>

{newsData.length === 0 ? (

<p>Loading news...</p>

) : (

newsData.slice(0,visibleCount).map((news,index)=>(
<div key={index} className={styles.card}>

<h3>{news.title}</h3>

<p>{news.description}</p>

<a
href={news.link}
target="_blank"
rel="noopener noreferrer"
className={styles.detailBtn}
>
View Details
</a>

</div>
))

)}

</div>

{/* VIEW MORE BUTTON */}

{visibleCount < newsData.length && (

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