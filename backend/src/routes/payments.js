// src/routes/payments.js
import express from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import * as paymentsController from "../controllers/paymentsController.js";

const router = express.Router();

// Citizen makes payment (amount auto from Service.fee)
router.post("/", authenticate, authorize("citizen"), paymentsController.createPayment);

// Get my payments (citizen)
router.get("/my", authenticate, paymentsController.getMyPayments);

// Admin/officer/dhead can list all
router.get("/", authenticate, authorize("officer"), paymentsController.getAllPayments);

// Update payment method (citizen, before confirmation)
router.put("/:id", authenticate, authorize("citizen"), paymentsController.updatePaymentMethod);

// Admin confirms/rejects payment
router.put("/:id/status", authenticate, authorize("admin"), paymentsController.confirmOrRejectPayment);

export default router;
