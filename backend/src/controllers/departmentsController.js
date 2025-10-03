// controllers/departmentsController.js
import Department from "../models/Department.js";
import User from "../models/User.js";

// Create department (Admin only)
export async function createDepartment(req, res) {
  try {
    const { name, description } = req.body;
    const dept = await Department.create({ name, description });
    res.status(201).json(dept);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// List all departments (all authenticated users)
export async function listDepartments(req, res) {
  try {
    const depts = await Department.findAll();
    res.json(depts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get single department + its users (admin/dhead can see their department users)
export async function getDepartment(req, res) {
  try {
    const dept = await Department.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["id", "name", "email", "role"] }],
    });
    if (!dept) return res.status(404).json({ message: "Department not found" });

    // dhead can only see their own department
    if (req.user.role === "dhead" && req.user.department_id !== dept.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    res.json(dept);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update department (Admin only)
export async function updateDepartment(req, res) {
  try {
    const { name, description } = req.body;
    const dept = await Department.findByPk(req.params.id);
    if (!dept) return res.status(404).json({ message: "Department not found" });

    dept.name = name ?? dept.name;
    dept.description = description ?? dept.description;
    await dept.save();

    res.json(dept);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete department (Admin only)
export async function deleteDepartment(req, res) {
  try {
    const dept = await Department.findByPk(req.params.id);
    if (!dept) return res.status(404).json({ message: "Department not found" });

    await dept.destroy();
    res.json({ message: "Department deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
