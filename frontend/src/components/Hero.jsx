// Hero.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

function Hero() {
  const { user } = useSelector((state) => state.user); 

  return (
    <section className="relative w-full bg-gradient-to-br from-teal-600 via-teal-500 to-teal-400 text-white py-24 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

      {/* Content */}
      <h1 className="relative z-10 text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-md">
        Welcome,{" "}
        <span className="text-yellow-300">
          {user?.username || "Guest"} 
        </span>
      </h1>

      <p className="relative z-10 max-w-2xl text-base md:text-lg leading-relaxed text-white/90 mb-10">
        Share your stories, ideas, and inspiration with the world.  
        A place where your voice matters, write freely, connect deeply,  
        and let your words make an impact.
      </p>

      <Link
  to="/yourblogs"
  className="relative z-10 bg-white text-teal-700 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-yellow-300 hover:text-gray-900 transition transform hover:scale-105 active:scale-95"
>
  Your Blogs
</Link>

    </section>
  );
}

export default Hero;
