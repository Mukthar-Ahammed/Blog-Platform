import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/blogSlice";
import { Link } from "react-router-dom";

function Blog() {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-teal-600 font-semibold">
        Loading blogs...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        All Blogs
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link
            to={`/blog/${blog._id}`}
            key={blog._id}
            className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition block"
          >
            {blog.coverImage && (
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {blog.description?.slice(0, 100)}...
              </p>
              <span className="text-sm text-gray-500">
                ✍️ {blog.author?.username || "Unknown"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Blog;
