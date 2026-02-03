import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

/* SIGNUP */
router.post("/signup", signUp);

/* SIGNIN */
router.post("/signin", signIn);

export default router;
