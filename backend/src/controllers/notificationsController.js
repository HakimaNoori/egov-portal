// controllers/notificationsController.js
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import Request from "../models/Request.js";

// ✅ Create a notification (Admin or System)
export async function createNotification(req, res) {
  try {
    const { user_id, request_id, message } = req.body;
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const notification = await Notification.create({ user_id, request_id, message });
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Get my notifications
export async function myNotifications(req, res) {
  try {
    const notifications = await Notification.findAll({
      where: { user_id: req.user.id },
      include: [{ model: Request, attributes: ["id", "status"] }],
      order: [["created_at", "DESC"]],
    });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Mark a notification as read
export async function markAsRead(req, res) {
  try {
    const notif = await Notification.findByPk(req.params.id);
    if (!notif) return res.status(404).json({ message: "Notification not found" });

    if (notif.user_id !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    notif.read_status = true;
    await notif.save();
    res.json({ message: "Notification marked as read", notif });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Admin: list all notifications (system-wide)
export async function listAllNotifications(req, res) {
  try {
    const notifications = await Notification.findAll({
      include: [{ model: User, attributes: ["id", "name", "email", "role"] }],
      order: [["created_at", "DESC"]],
    });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
