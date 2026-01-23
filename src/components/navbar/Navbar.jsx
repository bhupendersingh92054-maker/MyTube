import "./Navbar.css";
import menu from "../../assets/menu.png";
import logoo from "../../assets/logoo.png";
import search from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification_icon from "../../assets/notification.png";
import profile_icon from "../../assets/jack.png";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

const Navbar = ({ setSidebar }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img
          className="menu-icon"
          src={menu}
          alt="menu"
          onClick={() => setSidebar((prev) => !prev)}
        />
        <Link to="/">
          <img className="logo" src={logoo} alt="logo" />
        </Link>
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <img src={search} alt="search" onClick={handleSearch} />
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={upload_icon} alt="upload" />
        <img src={more_icon} alt="more" />
        <img src={notification_icon} alt="notification" />
        <img src={profile_icon} className="user-icon" alt="profile" />
      </div>
    </nav>
  );
};

export default Navbar;
