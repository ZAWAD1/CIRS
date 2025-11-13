import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js"; // <-- this line যোগ করো ✅

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Backend running successfully! 🚀");
});

// Server listen
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
