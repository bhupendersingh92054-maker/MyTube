// import "./Home.css";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Feed from "../../components/feeds/Feed";
// import { useState } from "react";

// const Home = ({ sidebar }) => {
//   const [Category, setCategory] = useState(0);

//   return (
//     <>
//       <Sidebar
//         sidebar={sidebar}
//         Category={Category}
//         setCategory={setCategory}
//       />
//       <div className={`container ${sidebar ? "" : "large-container"}`}>
//         <Feed Category={Category} />
//       </div>
//     </>
//   );
// };

// export default Home;


import "./Home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feeds/Feed";
import { useState } from "react";

const Home = () => {
  const [Category, setCategory] = useState(0);

  return (
    <div className="home-page">
      {/* Sidebar */}
      <Sidebar Category={Category} setCategory={setCategory} />

      {/* Main content / Feed */}
      <div className="main-content">
        <Feed Category={Category} />
      </div>
    </div>
  );
};

export default Home;
