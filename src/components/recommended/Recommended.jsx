import React, { useEffect, useState } from "react";
import "./Recommended.css";
import thumbnail1 from "../../assets/thumbnail1.png";
import thumbnail2 from "../../assets/thumbnail2.png";
import thumbnail3 from "../../assets/thumbnail3.png";
import thumbnail4 from "../../assets/thumbnail4.png";
import thumbnail5 from "../../assets/thumbnail5.png";
import thumbnail6 from "../../assets/thumbnail6.png";
import thumbnail7 from "../../assets/thumbnail7.png";
import thumbnail8 from "../../assets/thumbnail8.png";
import { API_KEY, value_converter } from "../../data";

const Recommended = ({ categoryId }) => {
  const [apiData, setapiData] = useState([]);

  const fetchData = async () => {
    const relatedVideo_Url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(relatedVideo_Url)
      .then((res) => res.json())
      .then((data) => setapiData(data.items || []));
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className="recommended">
      {apiData.map((item, index) => (
        <div key={index} className="side-video-list">
          <img
            src={item.snippet?.thumbnails?.medium?.url}
            alt={item.snippet?.title}
          />
          <div className="vid-info">
            <h4>{item.snippet?.title}</h4>
            <p>{item.snippet?.channelTitle}</p>
            <p>
              {item.statistics
                ? value_converter(item.statistics.viewCount)
                : "0"}{" "}
              views
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Recommended;