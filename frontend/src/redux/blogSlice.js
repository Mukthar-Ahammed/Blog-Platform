import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";


export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (blogData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("content", blogData.content);
      if (blogData.coverImage) {
        formData.append("coverImage", blogData.coverImage);
      }

      const { data } = await axiosInstance.post("/blog/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Blog created successfully!");
      return data.blog;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create blog");
      return rejectWithValue(error.response?.data?.message || "Failed to create blog");
    }
  }
);

// Fetch all blogs
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/blog");
      return data.blogs || data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch blogs");
    }
  }
);


export const fetchBlogById = createAsyncThunk(
  "blogs/fetchBlogById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/blog/${id}`);
      return data.blog || data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch blog");
    }
  }
);





export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/blog/${id}`);
      toast.success("Blog deleted successfully!");
      return id;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete blog");
      return rejectWithValue(error.response?.data?.message || "Failed to delete blog");
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    selectedBlog: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedBlog: (state) => {
      state.selectedBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create blog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.unshift(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch all blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch single blog
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.selectedBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.error = action.payload;
      })


      // Delete blog
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((b) => b._id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearSelectedBlog } = blogSlice.actions;

export default blogSlice.reducer;