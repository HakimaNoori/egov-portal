// routes/notifications.js
import express from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import * as notificationsController from "../controllers/notificationsController.js";

const router = express.Router();

// ✅ Admin/System: create a notification
router.post(
  "/",
  authenticate,
  authorize("admin"),
  notificationsController.createNotification
);

// ✅ User: get my notifications
router.get(
  "/my",
  authenticate,
  notificationsController.myNotifications
);

// ✅ User: mark as read
router.put(
  "/:id/read",
  authenticate,
  notificationsController.markAsRead
);

// ✅ Admin: list all notifications
router.get(
  "/",
  authenticate,
  authorize("admin"),
  notificationsController.listAllNotifications
);

export default router;
