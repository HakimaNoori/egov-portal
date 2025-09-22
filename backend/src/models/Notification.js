import { pool } from "../db.js";

export const createNotification = async ({ user_id, message }) => {
  const result = await pool.query(
    `INSERT INTO notifications (user_id, message) VALUES ($1, $2) RETURNING *`,
    [user_id, message]
  );
  return result.rows[0];
};

export const getNotifications = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM notifications WHERE user_id=$1`,
    [user_id]
  );
  return result.rows;
};

export const markNotificationRead = async (id) => {
  const result = await pool.query(
    `UPDATE notifications SET read=true WHERE id=$1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};
