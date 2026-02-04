import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.routes.js";
import typeRoutes from "./routes/type.routes.js";
import activityRoutes from "./routes/activity.routes.js";
import authMiddleware from "./middleware/auth.js";
import cors from "cors";
import { callAPI } from "./llm/llm.controller.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/type", typeRoutes);
app.use("/api/activity", activityRoutes);

app.get("/test", async (req, res) => {
  let response = await callAPI();
  const cleanedText = response.text
    .replace(/^```json\s*/, "") // remove ```json at the start
    .replace(/\s*```$/, "") // remove ``` at the end
    .trim();
  return res.json(JSON.parse(cleanedText));
});

/* SECURE ROUTE */
app.get("/api/secure", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Verified", userId: req.userId });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDB();
});
