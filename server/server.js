import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.routes.js";
import authMiddleware from "./middleware/auth.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

/* SECURE ROUTE */
app.get("/api/secure", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Verified", userId: req.userId });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDB();
});
