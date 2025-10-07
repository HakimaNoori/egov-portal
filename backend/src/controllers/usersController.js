import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

function generateToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role, department_id: user.department_id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// ✅ Citizen Registration
export async function registerCitizen(req, res) {
  try {
    const { name, email, password, department_id } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password_hash: hashedPassword,
      role: "citizen",
      department_id: department_id || null, // optional for citizens
    });

    const token = generateToken(user);

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department_id: user.department_id,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Login (returns department_id now)
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department_id: user.department_id,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
        return res.status(403).json({ message: "Dhead cannot create dhead or admin accounts" });
      }
      if (department_id && department_id !== req.user.department_id) {
        return res.status(403).json({ message: "Dhead can only create users in their department" });
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

    res.json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department_id: user.department_id,
      },
    });
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
        return res.status(403).json({ message: "Dhead cannot assign dhead or admin roles" });
      }
      if (department_id && department_id !== req.user.department_id) {
        return res.status(403).json({ message: "Dhead cannot move users to another department" });
      }
    }

    user.role = role || user.role;
    user.department_id = department_id || user.department_id;
    await user.save();

    res.json({
      message: "User updated successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department_id: user.department_id,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// ✅ Delete user (admin only)
export async function deleteUser(req, res) {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
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
