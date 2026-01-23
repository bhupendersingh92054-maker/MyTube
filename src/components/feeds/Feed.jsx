import "./Feeds.css";
import { Link } from "react-router";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";
import { useEffect, useState } from "react";

const Feed = ({ Category }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const VideoList_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${Category}&key=${API_KEY}`;
      try {
        const response = await fetch(VideoList_URL);
        const result = await response.json();
        setData(result.items || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [Category]);

  if (loading) {
    return <p>Loading videos...</p>;
  }

  return (
    <div className="feed">
      {data.map((item) => (
        <Link
          key={item.id}
          to={`/video/${item.snippet?.categoryId || 0}/${item.id}`}
          className="card"
        >
          <img
            src={item.snippet?.thumbnails?.medium?.url || ""}
            alt={item.snippet?.title || ""}
          />
          <h2>{item.snippet?.title || "No Title"}</h2>
          <h3>{item.snippet?.channelTitle || "Unknown Channel"}</h3>
          <p>
            {value_converter(item.statistics?.viewCount || 0)} views •{" "}
            {moment(item.snippet?.publishedAt).fromNow()}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Feed;
