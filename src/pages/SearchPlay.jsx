import { useParams } from "react-router";
import Recommended from "../components/recommended/Recommended";
import PlayVideo from "../components/PlayVideo/PlayVideo";

const SearchPlay = () => {
  const { videoId, categoryId } = useParams();

  return (
    <div className="play-container">
      <PlayVideo videoId={videoId} />
      <Recommended categoryId={categoryId} />
    </div>
  );
};

export default SearchPlay;
