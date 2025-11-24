import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import connectDB from "./db/connect.js";
import students from "./routes/students.js";

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT || 8000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Security headers
app.use((req, res, next) => {
  // Remove problematic headers and add secure ones
  res.removeHeader('X-Powered-By');
  res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Routesa
app.get("/api", (req, res) => {
  res.send("Student Tracker API is running.");
});

// Simple healthcheck (useful for hosting platforms)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/v1/students", students);

// Serve React build in production or when build is present
const clientBuildPath = path.resolve(__dirname, "../client/build");
if (fs.existsSync(clientBuildPath)) {
  // Cache static assets for 1 year
  app.use('/static', express.static(path.join(clientBuildPath, 'static'), {
    maxAge: '31536000000', // 1 year
    immutable: true,
    setHeaders: (res, path) => {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }));
  
  // Serve other static files without long-term caching
  app.use(express.static(clientBuildPath, {
    maxAge: '0',
    setHeaders: (res, path) => {
      if (path.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
    }
  }));

  // Fallback to index.html for non-API routes (client-side routing)
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

// Start the server
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    app.listen(port, () => {
      console.log(` Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌Error connecting to MongoDB:", err.message);
  }
};

startServer();
