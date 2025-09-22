import { createDepartment, getDepartments } from "../models/Department.js";

export const createDepartmentController = async (req, res) => {
  try {
    const department = await createDepartment(req.body.name);
    res.status(201).json(department);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const listDepartmentsController = async (req, res) => {
  try {
    const departments = await getDepartments();
    res.json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
