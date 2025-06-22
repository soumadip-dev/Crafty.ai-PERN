import app from "./app.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({
  path: "./.env",
});

// Set the port for the server
const PORT = process.env.PORT || 8080;

// Define a route for the root URL
app.get("/", (req, res) => {
  if (req.url === "/") {
    res.send("Hello from Crafty.ai Server!");
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
