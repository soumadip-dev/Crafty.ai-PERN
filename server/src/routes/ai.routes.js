import { Router } from "express";
import {
  generateArticle,
  generateBlogTitle,
  generateImage,
} from "../controllers/ai.controllers.js";
import { auth } from "../middlewares/auth.js";

// Creating router instance
const router = Router();

// Generate article route
router.post("/generate-article", auth, generateArticle);

// Generate blog title route
router.post("/generate-blog-title", auth, generateBlogTitle);

// Generate image route
router.post("/generate-image", auth, generateImage);

export default router;
