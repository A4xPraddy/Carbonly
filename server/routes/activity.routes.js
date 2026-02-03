import {
  createActivity,
  getActivitiesByDuration,
} from "../controllers/activity.controller.js";
import express from "express";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, createActivity);
router.get("/", authMiddleware, getActivitiesByDuration);

export default router;
