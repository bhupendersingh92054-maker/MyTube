import React, { useState, useEffect } from "react";
import "./PlayVideo.css";
import Like from "../../assets/like.png";
import Dislike from "../../assets/dislike.png";
import Share from "../../assets/share.png";
import Save from "../../assets/save.png";
import User_Profile from "../../assets/user_profile.jpg";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";

const PlayVideo = ({ videoId }) => {
  const [apiData, setapiData] = useState(null);
  const [channelData, setchannelData] = useState(null);
  const [commentData, setcommentData] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const description = apiData?.snippet?.description || "Description Here";
  const shortDescription = description.slice(0, 250);

  // Fetch video data
  const fetchVideoData = async () => {
    try {
      const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      setapiData(data.items?.[0] || null);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch comments
  const fetchCommentData = async () => {
    try {
      const url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      setcommentData(data.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch channel info
  useEffect(() => {
    if (apiData) {
      const fetchChannelData = async () => {
        try {
          const url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
          const res = await fetch(url);
          const data = await res.json();
          setchannelData(data.items?.[0] || null);
        } catch (err) {
          console.error(err);
        }
      };
      fetchChannelData();
    }
  }, [apiData]);

  // Run on videoId change
  useEffect(() => {
    setapiData(null);
    setchannelData(null);
    setcommentData([]);
    setShowFullDescription(false);
    window.scrollTo(0, 0); // scroll to top
    if (videoId) {
      fetchVideoData();
      fetchCommentData();
    }
  }, [videoId]);

  if (!apiData) return <p>Loading video...</p>;

  return (
    <div className="play-video">
      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <h3>{apiData.snippet.title}</h3>

      <div className="play-video-info">
        <p>
          {value_converter(apiData.statistics.viewCount)} views •{" "}
          {moment(apiData.snippet.publishedAt).fromNow()}
        </p>
        <div className="actions">
          <span>
            <img src={Like} alt="like" />
            {value_converter(apiData.statistics.likeCount)}
          </span>
          <span>
            <img src={Dislike} alt="dislike" />
          </span>
          <span>
            <img src={Share} alt="share" />
          </span>
          <span>
            <img src={Save} alt="save" />
          </span>
        </div>
      </div>

      <hr />

      <div className="publisher">
        <img src={channelData?.snippet?.thumbnails?.default?.url} alt="channel" />
        <div>
          <p>{apiData.snippet.channelTitle}</p>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : "1M"}{" "}
            Subscriber
          </span>
        </div>
        <button>Subscribe</button>
      </div>

      <div className="video-description">
        <p>
          {showFullDescription ? description : shortDescription}
          {description.length > 300 && (
            <span
              className="toggle-description"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? " Show less" : "...Read more"}
            </span>
          )}
        </p>

        <hr />
        <h4>{value_converter(apiData.statistics.commentCount)} Comments</h4>

        {commentData.map((item, index) => (
          <div className="comment" key={index}>
            <img
              src={item.snippet.topLevelComment.snippet.authorProfileImageUrl || User_Profile}
              alt={item.snippet.topLevelComment.snippet.authorDisplayName || "User"}
            />
            <div>
              <h3>
                {item.snippet.topLevelComment.snippet.authorDisplayName || "Unknown User"}
                <span>
                  {item.snippet.topLevelComment.snippet.publishedAt
                    ? moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()
                    : ""}
                </span>
              </h3>
              <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
              <div className="comment-action">
                <img src={Like} alt="like" />
                <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                <img src={Dislike} alt="dislike" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayVideo;
