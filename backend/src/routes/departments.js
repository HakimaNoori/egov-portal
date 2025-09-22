import express from "express";
import {
  createDepartmentController,
  listDepartmentsController,
} from "../controllers/departmentController.js";

const router = express.Router();

// ایجاد دپارتمان
router.post("/", createDepartmentController);

// لیست دپارتمان‌ها
router.get("/", listDepartmentsController);

export default router;
