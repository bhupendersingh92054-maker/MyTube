import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import video1 from "../../assets/video.mp4";
import Like from "../../assets/like.png";
import Dislike from "../../assets/dislike.png";
import Share from "../../assets/share.png";
import Save from "../../assets/save.png";
import Jack from "../../assets/jack.png";
import User_Profile from "../../assets/user_profile.jpg";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";
import { data } from "react-router";

const PlayVideo = ({ videoId }) => {
  const [apiData, setapiData] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [channelData, setchannelData] = useState(null);
  const [commentData, setcommentData] = useState([]);

  const description = apiData?.snippet?.description || "Description Here";
  const shortDescription = description.slice(0, 250);

  const fetchVideoData = async () => {
    try {
      const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      setapiData(data.items?.[0] || null);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCommentData = async () => {
    try {
      const url = ` https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      setcommentData(data.items || []);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (apiData) {
      const fetchChannelData = async () => {
        try {
          const url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
          const res = await fetch(url);
          const data = await res.json();
          setchannelData(data.items?.[0] || null); // pick the first channel item
        } catch (err) {
          console.error(err);
        }
      };

      fetchChannelData();
    }
  }, [apiData]);

  useEffect(() => {
    if (videoId) fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    if (videoId) fetchCommentData();
  }, [videoId]);

  return (
    <div className="play-video">
      {/* <video src={video1} controls autoPlay muted></video> */}
      {/* <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <h3>{apiData ? apiData.snippet.title : "Loading..."}</h3>
      <div className="play-video-info">
        <p>
          {value_converter(apiData?.statistics.viewCount)} views •{" "}
          {moment(apiData?.snippet.publishedAt).fromNow()}
        </p>

        {/* <p>1525 views &bull; 2 days ago</p> */}
        <div>
          <span>
            <img src={Like} alt="" />
            {apiData ? value_converter(apiData.statistics.likeCount) : 155}
          </span>
          <span>
            <img src={Dislike} alt="" />
          </span>
          <span>
            <img src={Share} alt="" />
          </span>
          <span>
            <img src={Save} alt="" />
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData?.snippet?.thumbnails?.default?.url} />

        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ""}</p>

          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : "1M"}
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
              style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "Show less" : "...Read more"}
            </span>
          )}
        </p>

        <hr />
        <h4>
          {apiData ? value_converter(apiData.statistics.commentCount) : 102}{" "}
          Comments
        </h4>
        {commentData.map((item, index) => (
          <div key={index} className="comment">
            <img
              src={
                item.snippet?.topLevelComment?.snippet?.authorProfileImageUrl ||
                User_Profile
              }
              alt={
                item.snippet?.topLevelComment?.snippet?.authorDisplayName ||
                "User"
              }
            />
            <div>
              <h3>
                {item.snippet?.topLevelComment?.snippet?.authorDisplayName ||
                  "Unknown User"}
                <span>
                  {item.snippet?.topLevelComment?.snippet?.publishedAt
                    ? moment(
                        item.snippet.topLevelComment.snippet.publishedAt,
                      ).fromNow()
                    : ""}
                </span>
              </h3>
              <p>{item.snippet?.topLevelComment?.snippet?.textDisplay || ""}</p>
              <div className="comment-action">
                <img src={Like} alt="" />
                <span>
                  {value_converter(
                    item.snippet?.topLevelComment?.snippet?.likeCount || 0,
                  )}
                </span>
                <img src={Dislike} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayVideo;