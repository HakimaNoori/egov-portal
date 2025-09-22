import {
  createNotification,
  getNotifications,
  markNotificationRead,
} from "../models/Notification.js";

// ایجاد اعلان جدید
export const createNotificationController = async (req, res) => {
  try {
    const { user_id, message } = req.body;
    const notification = await createNotification({ user_id, message });
    res.status(201).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// مشاهده همه اعلان‌های یک کاربر
export const listNotificationsController = async (req, res) => {
  try {
    const { user_id } = req.params;
    const notifications = await getNotifications(user_id);
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// علامت‌گذاری یک اعلان به عنوان خوانده شده
export const markNotificationReadController = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await markNotificationRead(id);
    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
