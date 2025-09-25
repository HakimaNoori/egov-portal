import express from "express";
import {
  register,
  login,
  refreshToken,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// refresh endpoint (GET or POST, both work; GET is common)
router.get("/refresh", refreshToken);

// logout endpoint
router.post("/logout", logout);

export default router;
