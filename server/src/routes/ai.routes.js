import { Router } from "express";
import {
  generateArticle,
  generateBlogTitle,
  generateImage,
  removeImageBackground,
  removeImageObject,
  resumeReview,
} from "../controllers/ai.controllers.js";
import { auth } from "../middlewares/auth.js";
import { upload } from "../configs/multer.js";

// Creating router instance
const router = Router();

// Generate article route
router.post("/generate-article", auth, generateArticle);

// Generate blog title route
router.post("/generate-blog-title", auth, generateBlogTitle);

// Generate image route
router.post("/generate-image", auth, generateImage);

// Remove background from image route
router.post(
  "/remove-image-background",
  upload.single("image"),
  auth,
  removeImageBackground,
);

// Remove any object from image route
router.post(
  "/remove-image-object",
  upload.single("image"),
  auth,
  removeImageObject,
);

// Resume Review route
router.post("/resume-review", upload.single("resume"), auth, resumeReview);

export default router;
