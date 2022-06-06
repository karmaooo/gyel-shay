import "./sidebar.scss";
import DescriptionIcon from "@mui/icons-material/Description";
import QuizIcon from "@mui/icons-material/Quiz";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Gyel-Shay</span>
        </Link>
      </div>
      <hr />
      <div className="bottom">
        <ul>
          <Link to="/stanzas" style={{ textDecoration: "none" }}>
            <li>
              <DescriptionIcon className="icon" />
              <span>stanzas</span>
            </li>
          </Link>
        </ul>
        <ul>
          <Link to="/quiz" style={{ textDecoration: "none" }}>
            <li>
              <QuizIcon className="icon" />
              <span>quiz</span>
            </li>
          </Link>
        </ul>
        <ul>
          <Link to="/video" style={{ textDecoration: "none" }}>
            <li>
              <OndemandVideoIcon className="icon" />
              <span>videos</span>
            </li>
          </Link>
        </ul>
        <ul>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
