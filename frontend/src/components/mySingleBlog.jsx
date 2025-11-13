import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useLocation } from "react-router-dom";
import { fetchBlogById, clearSelectedBlog } from "../redux/blogSlice";

function MySingleBlog() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedBlog, loading } = useSelector((state) => state.blogs);
  const location = useLocation();

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }

    return () => {
      dispatch(clearSelectedBlog());
    };
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-teal-600 font-semibold">
        Loading blog...
      </div>
    );
  }

  if (!selectedBlog) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 font-semibold">
        Blog not found.
      </div>
    );
  }

  const { title, description, content, author, createdAt } = selectedBlog;
  const displayText = description || content || "No description available";

  
  const backLink = location.pathname.startsWith("/yourblogs")
    ? "/yourblogs"
    : "/blogs";

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>

      <div className="flex justify-between items-center mb-6 text-gray-500 text-sm">
        <span>✍️ {author?.username || "Unknown Author"}</span>
        <span>
          {createdAt
            ? new Date(createdAt).toLocaleDateString()
            : "Date not available"}
        </span>
      </div>

      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {displayText}
      </p>

      <Link
        to={backLink}
        className="inline-block mt-6 text-teal-600 hover:underline"
      >
        ← Back
      </Link>
    </div>
  );
}

export default MySingleBlog;
