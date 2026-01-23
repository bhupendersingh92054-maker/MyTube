import React from "react";
import "./Video.css";
import PlayVideo from "../../components/PlayVideo/PlayVideo";
import Recommended from "../../components/recommended/Recommended";
import { useParams } from "react-router";

const Video = () => {
  const { videoId, categoryId } = useParams();
  console.log("videoId:", videoId);
  console.log("categoryId:", categoryId);
  return (
    <div className="play-container">
      <PlayVideo videoId={videoId} />
      <Recommended categoryId={categoryId} />
    </div>
  );
};

export default Video;
