import Blog from "../models/blog.model.js";
import cloudinary from "../lib/cloudinary.js";
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const insertController = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    let imageUrl = null;

   
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "blogs" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
       
        stream.end(req.file.buffer);
      });
      imageUrl = uploadResult.secure_url;
    }

    const blog = new Blog({
      title,
      description: content,
      coverImage: imageUrl,
      category,
      author: req.user._id,
    });

    await blog.save();
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    console.error(" Error creating blog:", error.message);
console.error(error.stack);
  }
};



export const deleteController = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

   
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const updateController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Check ownership
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Update text fields only if provided
    if (title) blog.title = title;
    if (description) blog.description = description;
    if (category) blog.category = category;

    // Only update image if a new file is uploaded
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "blogs" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      blog.coverImage = uploadResult.secure_url;
    }

    await blog.save();

    res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.error("Error updating blog:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const viewController = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username email");
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const singleBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("author", "username email");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ blog });
  } catch (error) {
    console.error("Error fetching blog:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

