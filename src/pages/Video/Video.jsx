import React from "react";
import { useParams } from "react-router";
import PlayVideo from "../../components/PlayVideo/PlayVideo";
import Recommended from "../../components/Recommended/Recommended";
import "./Video.css";

const Video = () => {
  const { videoId } = useParams();

  return (
    <div className="play-container">
      <PlayVideo videoId={videoId} />
      <Recommended />
    </div>
  );
};

export default Video;
