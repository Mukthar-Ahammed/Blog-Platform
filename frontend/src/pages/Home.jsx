// Home.jsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkUserAuth } from "../redux/userSlice";
import Hero from "../components/Hero";
import BlogContainer from "../components/BlogContainer";
import Footer from "../components/Footer";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth()); // ✅ Verify logged-in user
  }, [dispatch]);

  return (
    <>
      <Hero />
      <div id="create-blog">
        <BlogContainer />
      </div>
      <Footer />
    </>
  );
}

export default Home;
