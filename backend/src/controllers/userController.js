import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ Citizen self-register
export async function registerCitizen(req, res) {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password_hash: hash,
      role: "citizen",
    });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// ✅ Login (all roles)
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role, department_id: user.department_id },
      process.env.JWT_SECRET
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// ✅ Get own profile
export async function getProfile(req, res) {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "role", "department_id"],
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// ✅ Create user (admin full, dhead restricted)
export async function createUser(req, res) {
  try {
    const { name, email, password, role, department_id } = req.body;

    if (req.user.role === "dhead") {
      if (role === "dhead" || role === "admin") {
        return res
          .status(403)
          .json({ message: "Dhead cannot create dhead or admin accounts" });
      }
      if (department_id && department_id !== req.user.department_id) {
        return res
          .status(403)
          .json({ message: "Dhead can only create users in their department" });
      }
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password_hash: hash,
      role,
      department_id: department_id || req.user.department_id || null,
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// ✅ Update user (admin full, dhead restricted)
export async function updateUser(req, res) {
  try {
    const { role, department_id } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.user.role === "dhead") {
      if (role === "dhead" || role === "admin") {
        return res
          .status(403)
          .json({ message: "Dhead cannot assign dhead or admin roles" });
      }
      if (department_id && department_id !== req.user.department_id) {
        return res
          .status(403)
          .json({ message: "Dhead cannot move users to another department" });
      }
    }

    user.role = role || user.role;
    user.department_id = department_id || user.department_id;
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// ✅ Delete user (admin only)
export async function deleteUser(req, res) {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// ✅ List users (admin only)
export async function listUsers(req, res) {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role", "department_id"],
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// 🔹 اکسپورت alias برای سازگاری با روت‌ها
export const createUserByAdmin = createUser;
export const getAllUsers = listUsers;
export const loginUser = login;
