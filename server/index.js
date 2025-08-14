import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;
const DIRNAME = path.resolve();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://upskillr-se6s.onrender.com"],
    credentials: true,
  })
);

// --------------------
// API Routes
// --------------------
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

// --------------------
// Serve Vite Frontend (dist)
// --------------------
app.use(express.static(path.join(DIRNAME, "client/dist")));

// Catch-all: React handles routing
app.get("*", (_, res) => {
  res.sendFile(path.join(DIRNAME, "client/dist", "index.html"));
});

// --------------------
// Start server
// --------------------
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
