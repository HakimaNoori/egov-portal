import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  useGetMyPaymentsQuery,
  useUpdatePaymentMethodMutation,
} from "../../redux/services/paymentApiSlice";
import PaymentStatusBadge from "../../components/payments/PaymentStatusBadge";

export default function CitizenPaymentDetails() {
  const { id } = useParams();
  const { data: payments = [], isLoading } = useGetMyPaymentsQuery();
  const [updateMethod, { isLoading: updating }] = useUpdatePaymentMethodMutation();

  const payment = payments.find((p) => p.id === parseInt(id));
  const [method, setMethod] = useState(payment?.method || "");

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center">
          Loading payment details...
        </div>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="p-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center text-gray-600">
          Payment not found
        </div>
      </div>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!method) return alert("Select a payment method");
    
    try {
      await updateMethod({ id: payment.id, method }).unwrap();
      alert("Payment method updated successfully!");
    } catch (err) {
      alert(err?.data?.message || err.message || "Update failed");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Payment Details</h2>
          <div className="text-sm text-gray-600 mt-1">
            Payment #{payment.id} • {payment.Request?.Service?.name || "Service Payment"}
          </div>
        </div>
        <Link 
          to="/citizen/payments" 
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back to Payments
        </Link>
      </section>

      {/* Payment Information */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">Payment Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <label className="text-sm text-gray-500">Service</label>
            <p className="font-medium">{payment.Request?.Service?.name || "N/A"}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Amount</label>
            <p className="font-medium">${payment.amount}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Payment Method</label>
            <p className="font-medium capitalize">{payment.method?.replace('_', ' ')}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Status</label>
            <div className="font-medium">
              <PaymentStatusBadge status={payment.status} />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500">Created Date</label>
            <p className="font-medium">{new Date(payment.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Last Updated</label>
            <p className="font-medium">{new Date(payment.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </section>

      {/* Update Payment Method - Only for pending payments */}
      {payment.status === "pending" && (
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4">Update Payment Method</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Payment Method
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Choose a method</option>
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="onsite">On-site</option>
              </select>
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setMethod(payment.method)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={updating || method === payment.method}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? "Updating..." : "Update Method"}
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}