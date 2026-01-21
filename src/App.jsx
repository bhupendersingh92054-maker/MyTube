import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import Video from "./pages/Video/Video";
import Search from "./pages/Search/Search";

const App = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div className="app">
      <Navbar setSidebar={setSidebar} />
      <main>
        <Routes>
          <Route path="/" element={<Home sidebar={sidebar} />} />
          <Route path="/search/:query" element={<Search sidebar={sidebar} />} />
          <Route path="/video/:categoryId/:videoId" element={<Video sidebar={sidebar} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
