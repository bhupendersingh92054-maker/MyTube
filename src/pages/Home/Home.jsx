import "./Home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feeds/Feed";
import { useState } from "react";

const Home = ({ sidebar }) => {
  const [Category, setCategory] = useState(0);

  return (
    <>
      <Sidebar
        sidebar={sidebar}
        Category={Category}
        setCategory={setCategory}
      />
      <div className={`container ${sidebar ? "" : "large-container"}`}>
        <Feed Category={Category} />
      </div>
    </>
  );
};

export default Home;
