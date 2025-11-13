import express from "express";
import {
  insertController,
  deleteController,
  updateController,
  viewController,
  singleBlogController, 
} from "../controllers/blog.controllers.js";
import { protectRoute } from "../../middleware/auth.middleware.js";
import { upload } from "../controllers/blog.controllers.js";

const router = express.Router();

router.post("/create", protectRoute, upload.single("coverImage"), insertController);
router.get("/", viewController);
router.get("/:id", singleBlogController); 
router.put("/:id", protectRoute, upload.single("coverImage"), updateController);
router.delete("/:id", protectRoute, deleteController);

export default router;
