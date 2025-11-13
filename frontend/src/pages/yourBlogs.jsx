import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, deleteBlog } from "../redux/blogSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function YourBlogs() {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blogs);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(id))
        .unwrap()
        .then(() => toast.success("Blog deleted successfully"))
        .catch(() => toast.error("Failed to delete blog"));
    }
  };

  const userBlogs = blogs.filter((blog) => blog.author?._id === user?._id);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-teal-600 text-xl font-semibold animate-pulse">
          Loading your blogs...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Blogs
      </h2>

      {userBlogs.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't uploaded any blogs yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition"
            >
              <Link to={`/yourblogs/${blog._id}`}>
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

              <div className="flex justify-end px-5 pb-4">
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default YourBlogs;
