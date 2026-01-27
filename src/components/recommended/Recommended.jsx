import "./Recommended.css";
import { API_KEY, value_converter } from "../../data";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const Recommended = ({ categoryId }) => {
  const [apiData, setapiData] = useState([]);

  const fetchData = async () => {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=20&regionCode=IN&videoCategoryId=${categoryId || 0}&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    setapiData(data.items || []);
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className="recommended">
      {apiData.map((item) => (
        <Link key={item.id} to={`/video/${item.id}`} className="side-video-list">
          <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
          <div className="vid-info">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{value_converter(item.statistics.viewCount)} views</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
