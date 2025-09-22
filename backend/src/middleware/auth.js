import jwt from "jsonwebtoken";
import { query } from "../db.js";
import dotenv from "dotenv";
dotenv.config();

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const dbRes = await query(
      "SELECT id, name, role, department_id FROM users WHERE id=$1",
      [payload.id]
    );
    if (!dbRes.rows.length)
      return res.status(401).json({ message: "User not found" });
    req.user = dbRes.rows[0];
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const authorizeRoles =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden — insufficient role" });
    }
    next();
  };
