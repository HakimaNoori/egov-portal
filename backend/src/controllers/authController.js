// src/controllers/authController.js
import { createUser, getUserByEmail } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ثبت‌نام
export const register = async (req, res) => {
  try {
    const { name, email, password, role, department_id } = req.body;

    // چک کن ایمیل وجود نداشته باشه
    const existingUser = await getUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    // هش کردن پسورد فقط اینجا
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
      name,
      email,
      password: hashedPassword, // ← هش‌شده
      role,
      department_id,
    });

    res.status(201).json({ user });
  } catch (error) {
    console.error("Error in /register:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ورود
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // مقایسه پسورد وارد شده با هش ذخیره شده
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // ساختن توکن JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
