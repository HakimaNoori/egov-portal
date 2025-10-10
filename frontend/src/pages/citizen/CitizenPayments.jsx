import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetMyPaymentsQuery,
  useCreatePaymentMutation,
} from "../../redux/services/paymentApiSlice";
import { useMyRequestsQuery } from "../../redux/services/requestApiSlice";
import PaymentStatusBadge from "../../components/payments/PaymentStatusBadge";

export default function CitizenPayments() {
  const { data: payments = [], isLoading, isError } = useGetMyPaymentsQuery();
  const { data: requests = [], isLoading: requestsLoading } = useMyRequestsQuery();
  const [createPayment, { isLoading: creating }] = useCreatePaymentMutation();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ 
    request_id: "", 
    method: "credit_card" 
  });

  // Filter requests that don't already have a payment and are in a payable status
  const payableRequests = requests.filter(request => {
    // Check if this request already has a payment
    const hasPayment = payments.some(payment => payment.request_id === request.id);
    // Only show requests that don't have payments and are in approved status (or whatever status makes sense for your workflow)
    return !hasPayment && request.status === "approved"; // Adjust the status condition as needed
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.request_id) return alert("Select a request");
    
    try {
      await createPayment(formData).unwrap();
      setShowModal(false);
      setFormData({ request_id: "", method: "credit_card" });
    } catch (err) {
      alert(err?.data?.message || err.message || "Payment creation failed");
    }
  };

  const getSelectedRequest = () => {
    return requests.find(req => req.id === parseInt(formData.request_id));
  };

  const selectedRequest = getSelectedRequest();

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">My Payments</h2>
        <button
          onClick={() => setShowModal(true)}
          disabled={payableRequests.length === 0}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + New Payment
        </button>
      </section>

      {/* Payments Table */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        {isLoading ? (
          <div className="text-center py-8 text-gray-600">Loading payments...</div>
        ) : isError ? (
          <div className="text-center py-8 text-red-600">Failed to load payments</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">#</th>
                  <th className="px-4 py-3 text-left font-medium">Service</th>
                  <th className="px-4 py-3 text-left font-medium">Request ID</th>
                  <th className="px-4 py-3 text-left font-medium">Amount</th>
                  <th className="px-4 py-3 text-left font-medium">Method</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">
                      {payment.Request?.Service?.name || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      #{payment.request_id}
                    </td>
                    <td className="px-4 py-3 font-medium">${payment.amount}</td>
                    <td className="px-4 py-3 capitalize">
                      {payment.method?.replace('_', ' ')}
                    </td>
                    <td className="px-4 py-3">
                      <PaymentStatusBadge status={payment.status} />
                    </td>
                    <td className="px-4 py-3">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Link 
                        to={`/citizen/payments/${payment.id}`}
                        className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
                {payments.length === 0 && (
                  <tr>
                    <td 
                      colSpan="8" 
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No payments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Create Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Create New Payment
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Request
                </label>
                {requestsLoading ? (
                  <div className="w-full p-3 border border-gray-300 rounded-lg text-gray-500">
                    Loading requests...
                  </div>
                ) : payableRequests.length === 0 ? (
                  <div className="w-full p-3 border border-gray-300 rounded-lg text-gray-500 text-center">
                    No payable requests available
                  </div>
                ) : (
                  <select
                    value={formData.request_id}
                    onChange={(e) =>
                      setFormData({ ...formData, request_id: e.target.value })
                    }
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Choose a request</option>
                    {payableRequests.map((request) => (
                      <option key={request.id} value={request.id}>
                        #{request.id} - {request.Service?.name} - {request.status}
                      </option>
                    ))}
                  </select>
                )}
                {payableRequests.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    {payableRequests.length} request(s) available for payment
                  </p>
                )}
              </div>

              {selectedRequest && (
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <h4 className="font-medium text-sm mb-2">Selected Request Details:</h4>
                  <div className="text-xs space-y-1">
                    <p><span className="font-medium">Service:</span> {selectedRequest.Service?.name}</p>
                    <p><span className="font-medium">Status:</span> {selectedRequest.status}</p>
                    <p><span className="font-medium">Created:</span> {new Date(selectedRequest.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <select
                  value={formData.method}
                  onChange={(e) =>
                    setFormData({ ...formData, method: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="credit_card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="onsite">On-site</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setFormData({ request_id: "", method: "credit_card" });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating || !formData.request_id || payableRequests.length === 0}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creating ? "Creating..." : "Create Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}