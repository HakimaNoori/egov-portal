import express from "express";
import {
  createServiceController,
  listServicesController,
} from "../controllers/serviceController.js";

const router = express.Router();

// ایجاد سرویس
router.post("/", createServiceController);

// لیست سرویس‌ها
router.get("/", listServicesController);

export default router;
