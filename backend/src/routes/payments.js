import express from "express";
import {
  createPaymentController,
  listPaymentsController,
  updatePaymentStatusController,
} from "../controllers/paymentController.js";

const router = express.Router();

// ثبت پرداخت جدید
router.post("/", createPaymentController);

// مشاهده همه پرداخت‌ها
router.get("/", listPaymentsController);

// بروزرسانی وضعیت پرداخت
router.put("/:id", updatePaymentStatusController);

export default router;
