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

const PlayVideo = ({ videoId }) => {
  const [apiData, setapiData] = useState(null);

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

  useEffect(() => {
    if (videoId) fetchVideoData();
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
        <img src={Jack} alt="" />
        <div>
          <p>GreatStack</p>
          <span>1M Subscriber</span>
        </div>
        <button>Subscribe</button>
      </div>

      <div className="video-description">
        <p>Channel thats make learning Easy</p>
        <p>
          Subscribe to GreatStack to watch more tutorials on web development
        </p>
        <hr />
        <h4>140 Comments</h4>
        <div className="comment">
          <img src={User_Profile} alt="" />
          <div>
            <h3>
              JAck Nicola<span>1 day ago</span>
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              voluptatem quis quaerat minima perferendis id quos totam ab
              nesciunt quisquam?
            </p>
            <div className="comment-action">
              <img src={Like} alt="" />
              <span>244</span>
              <img src={Dislike} alt="" />
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={User_Profile} alt="" />
          <div>
            <h3>
              JAck Nicola<span>1 day ago</span>
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              voluptatem quis quaerat minima perferendis id quos totam ab
              nesciunt quisquam?
            </p>
            <div className="comment-action">
              <img src={Like} alt="" />
              <span>244</span>
              <img src={Dislike} alt="" />
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={User_Profile} alt="" />
          <div>
            <h3>
              JAck Nicola<span>1 day ago</span>
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              voluptatem quis quaerat minima perferendis id quos totam ab
              nesciunt quisquam?
            </p>
            <div className="comment-action">
              <img src={Like} alt="" />
              <span>244</span>
              <img src={Dislike} alt="" />
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={User_Profile} alt="" />
          <div>
            <h3>
              JAck Nicola<span>1 day ago</span>
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              voluptatem quis quaerat minima perferendis id quos totam ab
              nesciunt quisquam?
            </p>
            <div className="comment-action">
              <img src={Like} alt="" />
              <span>244</span>
              <img src={Dislike} alt="" />
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={User_Profile} alt="" />
          <div>
            <h3>
              JAck Nicola<span>1 day ago</span>
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              voluptatem quis quaerat minima perferendis id quos totam ab
              nesciunt quisquam?
            </p>
            <div className="comment-action">
              <img src={Like} alt="" />
              <span>244</span>
              <img src={Dislike} alt="" />
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={User_Profile} alt="" />
          <div>
            <h3>
              JAck Nicola<span>1 day ago</span>
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              voluptatem quis quaerat minima perferendis id quos totam ab
              nesciunt quisquam?
            </p>
            <div className="comment-action">
              <img src={Like} alt="" />
              <span>244</span>
              <img src={Dislike} alt="" />
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={User_Profile} alt="" />
          <div>
            <h3>
              JAck Nicola<span>1 day ago</span>
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              voluptatem quis quaerat minima perferendis id quos totam ab
              nesciunt quisquam?
            </p>
            <div className="comment-action">
              <img src={Like} alt="" />
              <span>244</span>
              <img src={Dislike} alt="" />
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={User_Profile} alt="" />
          <div>
            <h3>
              JAck Nicola<span>1 day ago</span>
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              voluptatem quis quaerat minima perferendis id quos totam ab
              nesciunt quisquam?
            </p>
            <div className="comment-action">
              <img src={Like} alt="" />
              <span>244</span>
              <img src={Dislike} alt="" />
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={User_Profile} alt="" />
          <div>
            <h3>
              JAck Nicola<span>1 day ago</span>
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              voluptatem quis quaerat minima perferendis id quos totam ab
              nesciunt quisquam?
            </p>
            <div className="comment-action">
              <img src={Like} alt="" />
              <span>244</span>
              <img src={Dislike} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
