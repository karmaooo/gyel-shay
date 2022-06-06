import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Stanza from "./pages/stanza/Stanza";
import AddVideo from "./pages/videos/AddVideo";
import { AuthProvider } from "./AuthProvider";
import Login from "./pages/login/Login";
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/">
              <Route index element={<Login />} />
              <Route path="home" element={<Home />} />
            </Route>
            <Route path="stanzas" element={<Stanza />}></Route>
            <Route path="video" element={<AddVideo />}></Route>
            {/* <Route path="quiz" element={<QuizList />}></Route> */}
            {/* <Route path="video" element={<Video />}></Route> */}
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
