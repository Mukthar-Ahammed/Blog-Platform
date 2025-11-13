import { Routes, Route, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Navbar from "./components/Navbar";
import YourBlogs from "./pages/yourBlogs";
import SingleBlog from "./components/SingleBlog";
import MySingleBlog from "./components/mySingleBlog"

function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/" || location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/yourblogs" element={<YourBlogs />} />

      
        <Route path="/blog/:id" element={<SingleBlog />} />

        
        <Route path="/yourblogs/:id" element={<MySingleBlog />} />
      </Routes>
    </>
  );
}

export default App;
