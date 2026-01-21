import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import Sidebar from "../../components/sidebar/Sidebar";
import { API_KEY } from "../../data";
import moment from "moment";
import "./Search.css";

const Search = ({ sidebar }) => {
  const { query } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const SEARCH_URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${API_KEY}`;

      const res = await fetch(SEARCH_URL);
      const data = await res.json();
      setVideos(data.items || []);
    };

    fetchSearchResults();
  }, [query]);

  return (
    <>
      <Sidebar sidebar={sidebar} />

      <div className={`container ${sidebar ? "" : "large-container"}`}>
        <div className="search-results">
          {videos.map((item) => (
            <Link
              to={`/video/${item.id.videoId}`}
              key={item.id.videoId}
              className="search-card"
            >
              <img src={item.snippet.thumbnails.medium.url} alt="" />
              <div>
                <h3>{item.snippet.title}</h3>
                <p>{item.snippet.channelTitle}</p>
                <span>{moment(item.snippet.publishedAt).fromNow()}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
