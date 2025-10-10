import { useParams, Link } from "react-router-dom";
import { useGetAllPaymentsQuery, useConfirmOrRejectPaymentMutation } from "../../redux/services/paymentApiSlice";
import PaymentStatusBadge from "../../components/payments/PaymentStatusBadge";

export default function AdminPaymentDetails() {
  const { id } = useParams();
  const { data: payments = [], isLoading } = useGetAllPaymentsQuery();
  const [confirmOrRejectPayment, { isLoading: updating }] = useConfirmOrRejectPaymentMutation();

  const payment = payments.find((p) => p.id === parseInt(id));

  const handleStatusUpdate = async (newStatus) => {
    if (!window.confirm(`Are you sure you want to ${newStatus} this payment?`)) return;
    
    try {
      await confirmOrRejectPayment({ id: payment.id, status: newStatus }).unwrap();
      alert(`Payment ${newStatus} successfully!`);
    } catch (err) {
      alert(err?.data?.message || err.message || "Status update failed");
    }
  };

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
          to="/admin/payments" 
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
            <label className="text-sm text-gray-500">Payment ID</label>
            <p className="font-medium">#{payment.id}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Citizen</label>
            <p className="font-medium">{payment.User?.name || "N/A"}</p>
            <p className="text-sm text-gray-500">{payment.User?.email}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Service</label>
            <p className="font-medium">{payment.Request?.Service?.name || "N/A"}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Request ID</label>
            <p className="font-medium">#{payment.request_id}</p>
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

      {/* Admin Actions */}
      {payment.status === "pending" && (
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4">Admin Actions</h3>
          <div className="flex gap-3">
            <button
              onClick={() => handleStatusUpdate("confirmed")}
              disabled={updating}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {updating ? "Processing..." : "Confirm Payment"}
            </button>
            <button
              onClick={() => handleStatusUpdate("rejected")}
              disabled={updating}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {updating ? "Processing..." : "Reject Payment"}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}