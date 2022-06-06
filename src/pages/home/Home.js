import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer"></div>
    </div>
  );
};

export default Home;
