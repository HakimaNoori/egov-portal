// src/controllers/paymentsController.js
import Payment from "../models/Payment.js";
import Request from "../models/Request.js";
import Service from "../models/Service.js";
import Notification from "../models/Notification.js"; // ✅ add notifications

// Citizen creates a payment (amount comes from Service.fee)
export const createPayment = async (req, res) => {
  try {
    const { request_id, method } = req.body;
    const userId = req.user.id;

    // 1. Find the request
    const request = await Request.findOne({
      where: { id: request_id, applicant_id: userId }, // citizen must own it
      include: [Service],
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found or not yours" });
    }

    // 2. Get fee from the Service
    const amount = request.Service.fee;

    // 3. Create payment with fee auto-set
    const payment = await Payment.create({
      request_id,
      amount,
      method,
      status: "pending",
    });

    // 4. Notify user
    await Notification.create({
      user_id: userId,
      title: "Payment Created",
      message: `Your payment of ${amount} for service "${request.Service.name}" is pending.`,
    });

    res.status(201).json(payment);
  } catch (error) {
    console.error("Create Payment Error:", error);
    res.status(500).json({ message: "Error creating payment", error });
  }
};

// Citizen fetches own payments
export const getMyPayments = async (req, res) => {
  try {
    const userId = req.user.id;

    const payments = await Payment.findAll({
      include: {
        model: Request,
        where: { applicant_id: userId },
        include: [Service],
      },
    });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error });
  }
};

// Officer/Dhead/Admin fetch all
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [
        {
          model: Request,
          include: [Service],
        },
      ],
    });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error });
  }
};

// Citizen updates payment method (before confirmation)
export const updatePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const { method } = req.body;
    const userId = req.user.id;

    // only allow if still pending
    const payment = await Payment.findOne({
      where: { id },
      include: { model: Request, where: { applicant_id: userId }, include: [Service] },
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    if (payment.status !== "pending") {
      return res.status(400).json({ message: "Cannot update confirmed/rejected payments" });
    }

    payment.method = method;
    await payment.save();

    // notify user
    await Notification.create({
      user_id: userId,
      title: "Payment Updated",
      message: `Your payment for service "${payment.Request.Service.name}" was updated to method "${method}".`,
    });

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error updating payment", error });
  }
};

// Admin confirms or rejects payment
export const confirmOrRejectPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // confirmed/rejected

    if (!["confirmed", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const payment = await Payment.findByPk(id, {
      include: { model: Request, include: [Service] },
    });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.status = status;
    await payment.save();

    // notify citizen
    await Notification.create({
      user_id: payment.Request.applicant_id,
      title: `Payment ${status}`,
      message: `Your payment of ${payment.amount} for service "${payment.Request.Service.name}" has been ${status}.`,
    });

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error updating payment status", error });
  }
};
