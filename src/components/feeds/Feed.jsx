import React, { useEffect, useState } from "react";
import "./Feeds.css";
import { Link } from "react-router";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";

const Feed = ({ Sidebar,Category, setCategory }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const VideoList_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${Category}&key=${API_KEY}`;
    
    try {
      const response = await fetch(VideoList_URL);
      const result = await response.json();
      setData(result.items || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [Category]);

  return (
    <div className="feed">
      {data.map((item, index) => (
        <Link
          key={item.id}
          to={`/video/${item.snippet.categoryId}/${item.id}`}
          className="card"
        >
          <img
            src={item.snippet.thumbnails.medium.url}
            alt={item.snippet.title}
          />
          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>
          <p>
            {value_converter(item.statistics.viewCount)} views • {" "}
            {moment(item.snippet.publishedAt).fromNow()}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Feed;

