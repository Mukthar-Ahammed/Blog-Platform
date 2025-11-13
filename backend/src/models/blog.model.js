import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Blog description is required"],
    },
    coverImage: {
      type: String, 
      required: [true, "Cover image is required"],
    },
    category: {
      type: String,
      enum: ["Technology", "Lifestyle", "Education", "Business", "Other"], 
      default: "Other",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, 
  }
);

const Blog=mongoose.model("Blog",blogSchema);

export default Blog;