import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchBlogById,
  clearSelectedBlog,
} from "../redux/blogSlice";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

function MySingleBlog() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedBlog, loading } = useSelector((state) => state.blogs);
  const { user } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    if (id) dispatch(fetchBlogById(id));
    return () => dispatch(clearSelectedBlog());
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedBlog) {
      setEditedTitle(selectedBlog.title || "");
      setEditedDescription(selectedBlog.description || "");
    }
  }, [selectedBlog]);

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

  const { title, description, author, createdAt } = selectedBlog;

  const handleUpdate = async () => {
    try {
      const { data } = await axiosInstance.put(`/blog/${id}`, {
        title: editedTitle,
        description: editedDescription,
      });
      toast.success("Blog updated successfully!");
      setIsEditing(false);
      dispatch(fetchBlogById(id)); // Refresh blog details
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update blog");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md mt-10">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full text-2xl font-semibold border p-2 rounded mb-4"
          />

          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            rows="8"
            className="w-full border p-3 rounded mb-4"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>

          <div className="flex justify-between items-center mb-6 text-gray-500 text-sm">
            <span> {author?.username || "Unknown Author"}</span>
            <span>
              {createdAt
                ? new Date(createdAt).toLocaleDateString()
                : "Date not available"}
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
            {description || "No description available"}
          </p>

          <div className="flex justify-between items-center">
            <Link
              to="/yourblogs"
              className="text-teal-600 hover:underline font-medium"
            >
              ← Back
            </Link>

            {/* Edit button only visible to author */}
            {user && author && user._id === author._id && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
              >
                Edit
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default MySingleBlog;
