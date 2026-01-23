import SearchVideo from "../../components/searchVideo/SearchVideo";
import Sidebar from "../../components/sidebar/Sidebar";
import Recommended from "../../components/recommended/Recommended";
import { useState } from "react";

const Search = ({ sidebar }) => {
  const [category, setCategory] = useState(0);

  return (
    <>
      <Sidebar
        sidebar={sidebar}
        category={category}
        setCategory={setCategory}
      />

      <div className={`container ${!sidebar ? "large-container" : ""}`}>
        <SearchVideo sidebar={sidebar} />
        <Recommended categoryId={category} />
      </div>
    </>
  );
};

export default Search;
