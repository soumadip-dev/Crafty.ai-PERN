import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import {
  getPublishedCreations,
  getUserCreations,
  toggleLikeCreation,
} from "../controllers/user.controllers.js";

const router = Router();

// Route to get user creations
router.get("/get-user-creations", auth, getUserCreations);

// Route to get published creations
router.get("/get-published-creactions", auth, getPublishedCreations);

// Route to toggle like creation
router.post("/toggle-like-creation", auth, toggleLikeCreation);

export default router;
