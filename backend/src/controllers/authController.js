import { createUser, getUserByEmail } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

// --- توکن‌ها ---
const createAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" } // کوتاه‌مدت
  );
};

const createRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" } // طولانی‌مدت
  );
};

// --- ثبت‌نام ---
export const register = async (req, res) => {
  try {
    const { name, email, password, role, department_id } = req.body;

    const existingUser = await getUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      department_id,
    });

    // توکن‌ها
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    // Refresh token در httpOnly cookie
    res.setHeader("Set-Cookie", cookie.serialize("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    }));

    res.status(201).json({ user, accessToken });
  } catch (error) {
    console.error("Error in /register:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// --- ورود ---
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    res.setHeader("Set-Cookie", cookie.serialize("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    }));

    res.json({ user, accessToken });
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// --- refresh token ---
export const refreshToken = (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) return res.sendStatus(401);

    const refreshToken = cookies.refreshToken;
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);

      const accessToken = createAccessToken({ id: decoded.id, role: decoded.role });
      res.json({ accessToken });
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// --- logout ---
export const logout = (req, res) => {
  res.setHeader("Set-Cookie", cookie.serialize("refreshToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  }));
  res.json({ message: "Logged out successfully" });
};
