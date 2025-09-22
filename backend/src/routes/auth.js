import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// ثبت‌نام
router.post("/register", register);

// ورود
router.post("/login", login);

export default router;
