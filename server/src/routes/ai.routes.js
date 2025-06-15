import { Router } from "express";

import { generateArticle } from "../controllers/ai.controllers.js";
import { auth } from "../middlewares/auth.js";

// Creating router instance
const router = Router();

// Generate article route
router.post("/generate-article", auth, generateArticle);

export default router;
