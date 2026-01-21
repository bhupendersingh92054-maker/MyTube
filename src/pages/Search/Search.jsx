import React, { useState } from 'react';
import SearchVideo from '../../components/searchVideo/SearchVideo';
import Sidebar from '../../components/sidebar/Sidebar';

const Search = ({ sidebar }) => {
  const [category, setCategory] = useState(0);

  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      <div className={`container ${!sidebar ? 'large-container' : ''}`}>
        <SearchVideo sidebar={sidebar} />
      </div>
    </>
  );
};

export default Search;
