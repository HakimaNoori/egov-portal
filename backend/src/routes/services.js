import express from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import * as servicesController from "../controllers/servicesController.js";

const router = express.Router();

// Create service (admin only)
router.post(
  "/",
  authenticate,
  authorize("admin"),
  servicesController.createService
);

// List all services (all logged-in users)
router.get(
  "/",
  authenticate,
  servicesController.listServices
);

// Get one service (all logged-in users)
router.get(
  "/:id",
  authenticate,
  servicesController.getService
);

// Update service (admin only)
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  servicesController.updateService
);

// Delete service (admin only)
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  servicesController.deleteService
);

export default router;
