import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

function BlogContainer() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    coverImage: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "coverImage" && files && files[0]) {
      setFormData((prev) => ({ ...prev, coverImage: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      if (formData.coverImage) data.append("coverImage", formData.coverImage);

      // ✅ Match backend route and field name
      const res = await axiosInstance.post("/blog/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // include auth cookies
      });

      toast.success("Blog posted successfully!", { position: "top-center" });
      console.log("✅ Blog uploaded:", res.data);

      setFormData({ title: "", content: "", coverImage: null });
      setPreview(null);
    } catch (error) {
      console.error("❌ Error uploading blog:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Failed to upload blog. Try again.",
        { position: "top-center" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="create-blog"
      className="max-w-2xl mx-auto my-16 bg-white shadow-lg rounded-2xl p-8 border border-gray-100"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Create a New Blog
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Blog Title */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter blog title"
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
          required
        />

        {/* Blog Content */}
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your blog content..."
          rows="6"
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
          required
        ></textarea>

        {/* Cover Image Upload */}
        <div className="flex flex-col items-center space-y-3">
          <label className="text-gray-600 font-medium self-start">
            Upload Cover Image (optional)
          </label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-teal-500 file:text-white hover:file:bg-teal-600 transition"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-56 object-cover rounded-lg border border-gray-200 shadow-sm"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-500 text-white py-3 rounded-md font-semibold hover:bg-teal-600 transition disabled:opacity-70"
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}

export default BlogContainer;
