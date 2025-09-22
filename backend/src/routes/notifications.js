import express from "express";
import {
  createNotificationController,
  listNotificationsController,
  markNotificationReadController,
} from "../controllers/notificationController.js";

const router = express.Router();

// ایجاد اعلان
router.post("/", createNotificationController);

// لیست اعلان‌های کاربر
router.get("/:user_id", listNotificationsController);

// علامت‌گذاری اعلان به عنوان خوانده شده
router.put("/read/:id", markNotificationReadController);

export default router;
