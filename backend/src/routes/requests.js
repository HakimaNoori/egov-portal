import express from "express";
import {
  createRequestController,
  listRequestsController,
  approveRequestController,
  rejectRequestController,
} from "../controllers/requestController.js";

const router = express.Router();

// ایجاد درخواست جدید
router.post("/", createRequestController);

// لیست همه درخواست‌ها
router.get("/", listRequestsController);

// تایید درخواست
router.put("/approve/:id", approveRequestController);

// رد درخواست
router.put("/reject/:id", rejectRequestController);

export default router;
