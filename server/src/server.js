import express from "express";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import dotenv from "dotenv";
import aiRoutes from "./routes/ai.routes.js";
import connectCloudinary from "./configs/cloudinary.js";

const app = express();

await connectCloudinary();

// Enable CORS to allow requests from other domains
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Initialize Clerk Middleware
app.use(clerkMiddleware());

// Load environment variables from .env file
dotenv.config({
  path: "./.env",
});

// Set the port for the server
const PORT = process.env.PORT || 8080;

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Hello from Crafty.ai Server!");
});

// Apply authentication middleware to all routes
app.use(requireAuth());

// Routes
app.use("/api/v1/ai", aiRoutes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
