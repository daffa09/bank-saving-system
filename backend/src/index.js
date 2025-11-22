import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Bank Saving System API is running" });
});

// API Routes
app.use("/", router);

// 404 handler
app.use(notFoundHandler);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000; // Changed from 4000 to 5000 to match frontend expectations

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
