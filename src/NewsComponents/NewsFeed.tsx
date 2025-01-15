import React from "react";
import "./newsStyles.css";

//f5e45be0f1a348bba560f4ae6d8fa933

export default function NewsFeed({ newsData }) {
  return (
    <div>
      {newsData.map((article: { title: any; description: any }, index: any) => (
        <div key={index} className="news-feed-main">
          <div className="news-feed-heading">{article.title}</div>
          <div className="news-container">
            <p>{article.description}</p>
          </div>
        </div>
      ))}
      {/* <div className="news-feed-heading">
        Jamie Dimon says Bitcoin has 'no intrinsic value'
      </div>
      <div className="news-container">
        <p>
          Bitcoin soars past silver, Dogecoin gets a Musk boost, stocks get a
          Trump boost: Markets news roundup. Bitcoin's price has more than
          doubled in the past year, fueled by the Federal Reserve's interest
          rate cuts and hopes of a more supportive regulatory environment under
          the incoming Trump administration.
        </p>
      </div> */}
    </div>
  );
}
