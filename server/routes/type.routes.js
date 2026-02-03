import express from "express";
import { addType, getTypes } from "../controllers/type.controller.js";
const router = express.Router();

router.post("/", addType);
router.get("/", getTypes);

export default router;
