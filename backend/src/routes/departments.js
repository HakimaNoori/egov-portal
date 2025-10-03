// routes/departments.js
import express from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import * as departmentsController from "../controllers/departmentsController.js";

const router = express.Router();

// Create department (admin only)
router.post(
  "/",
  authenticate,
  authorize("admin"),
  departmentsController.createDepartment
);

// List all departments (all logged-in users)
router.get(
  "/",
  authenticate,
  departmentsController.listDepartments
);

// Get one department (+users) (admin + dhead restricted)
router.get(
  "/:id",
  authenticate,
  authorize("dhead"),
  departmentsController.getDepartment
);

// Update department (admin only)
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  departmentsController.updateDepartment
);

// Delete department (admin only)
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  departmentsController.deleteDepartment
);

export default router;
