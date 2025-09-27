import express from "express";
import {
  registerCitizen,
  createUserByAdmin,
  loginUser,
  getAllUsers,
} from "../controllers/userController.js";
import { protect, authorize } from "../middleware/auth.js";


const router = express.Router();

// Citizen self-register
router.post("/register", registerCitizen);

// Login (any user)
router.post("/login", loginUser);

// Admin creates officer/dhead/admin
router.post(
  "/create",
  protect,
  authorize("admin"), // only admin can create
  createUserByAdmin
);

// Admin get all users
router.get(
  "/",
  protect,
  authorize("admin"), // only admin can see all
  getAllUsers
);

export default router;
