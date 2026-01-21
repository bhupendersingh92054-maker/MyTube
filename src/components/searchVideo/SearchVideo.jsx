import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { API_KEY } from "../../data";
import moment from "moment";
import "./SearchVideo.css";

const SearchVideo = ({ sidebar }) => {
  const { query } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const SEARCH_URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${API_KEY}`;
        const res = await fetch(SEARCH_URL);
        const data = await res.json();
        setVideos(data.items || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className={`container ${!sidebar ? "large-container" : ""}`}>
      <div className="search-results">
        {loading ? (
          <p>Loading videos...</p>
        ) : videos.length === 0 ? (
          <p>No videos found for "{query}"</p>
        ) : (
          videos.map((item) => (
            <Link
              to={`/video/${item.id?.videoId}`}
              key={item.id?.videoId || item.etag}
              className="search-card"
            >
              <img
                src={item.snippet?.thumbnails?.medium?.url || ""}
                alt={item.snippet?.title || ""}
              />
              <div>
                <h3>{item.snippet?.title}</h3>
                <p>{item.snippet?.channelTitle}</p>
                <span>{moment(item.snippet?.publishedAt).fromNow()}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchVideo;
