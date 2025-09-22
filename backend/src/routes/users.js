import express from "express";
import {
  getUser,
  listUsers,
  updateUserController,
} from "../controllers/userController.js";

const router = express.Router();

// دریافت یک کاربر با ID
router.get("/:id", getUser);

// لیست همه کاربران
router.get("/", listUsers);

// بروزرسانی کاربر
router.put("/:id", updateUserController);

export default router;
