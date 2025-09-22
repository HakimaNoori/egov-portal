import {
  createPayment,
  getPayments,
  updatePaymentStatus,
} from "../models/payment.js";

// ثبت پرداخت جدید
export const createPaymentController = async (req, res) => {
  try {
    const { request_id, amount } = req.body;
    const payment = await createPayment({
      request_id,
      amount,
      status: "Pending",
    });
    res.status(201).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// مشاهده همه پرداخت‌ها
export const listPaymentsController = async (req, res) => {
  try {
    const payments = await getPayments();
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// تغییر وضعیت پرداخت
export const updatePaymentStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // مثال: 'Success', 'Failed'
    const payment = await updatePaymentStatus(id, status);
    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
