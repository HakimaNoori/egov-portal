import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllPaymentsQuery, useConfirmOrRejectPaymentMutation } from "../../redux/services/paymentApiSlice";
import PaymentStatusBadge from "../../components/payments/PaymentStatusBadge";

export default function AdminPayments() {
  const { data: payments = [], isLoading, isError } = useGetAllPaymentsQuery();
  const [confirmOrRejectPayment, { isLoading: updating }] = useConfirmOrRejectPaymentMutation();
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Calculate comprehensive statistics
  const stats = {
    total: payments.length,
    pending: payments.filter(p => p.status === "pending").length,
    confirmed: payments.filter(p => p.status === "confirmed").length,
    rejected: payments.filter(p => p.status === "rejected").length,
    
    // Revenue calculations
    totalRevenue: payments.filter(p => p.status === "confirmed").reduce((sum, p) => sum + parseFloat(p.amount), 0),
    pendingRevenue: payments.filter(p => p.status === "pending").reduce((sum, p) => sum + parseFloat(p.amount), 0),
    
    // Method breakdown
    creditCard: payments.filter(p => p.method === "credit_card").length,
    paypal: payments.filter(p => p.method === "paypal").length,
    bankTransfer: payments.filter(p => p.method === "bank_transfer").length,
    onsite: payments.filter(p => p.method === "onsite").length,
    
    // Monthly revenue (last 30 days)
    monthlyRevenue: payments
      .filter(p => p.status === "confirmed" && 
        new Date(p.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
      .reduce((sum, p) => sum + parseFloat(p.amount), 0),
  };

  // Filter payments based on selected filters
  const filteredPayments = payments.filter(payment => {
    const statusMatch = statusFilter === "all" || payment.status === statusFilter;
    const methodMatch = methodFilter === "all" || payment.method === methodFilter;
    
    // Date filtering
    let dateMatch = true;
    if (dateFilter === "today") {
      const today = new Date().toDateString();
      dateMatch = new Date(payment.createdAt).toDateString() === today;
    } else if (dateFilter === "week") {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      dateMatch = new Date(payment.createdAt) >= weekAgo;
    } else if (dateFilter === "month") {
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      dateMatch = new Date(payment.createdAt) >= monthAgo;
    }
    
    return statusMatch && methodMatch && dateMatch;
  });

  const handleStatusUpdate = async (paymentId, newStatus) => {
    if (!window.confirm(`Are you sure you want to ${newStatus} this payment?`)) return;
    
    try {
      await confirmOrRejectPayment({ id: paymentId, status: newStatus }).unwrap();
    } catch (err) {
      alert(err?.data?.message || err.message || "Status update failed");
    }
  };

  const getStatusActions = (payment) => {
    if (payment.status === "pending") {
      return (
        <div className="flex gap-2">
          <button
            onClick={() => handleStatusUpdate(payment.id, "confirmed")}
            disabled={updating}
            className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:opacity-50"
          >
            Confirm
          </button>
          <button
            onClick={() => handleStatusUpdate(payment.id, "rejected")}
            disabled={updating}
            className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      );
    }
    return <span className="text-gray-500 text-sm">No actions</span>;
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Payments Management</h2>
            <p className="text-gray-600 mt-1">Complete overview of all payment transactions</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All Methods</option>
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="onsite">On-site</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Comprehensive Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="font-bold text-blue-700 text-xl">{stats.total}</div>
            <div className="text-blue-600 text-sm font-medium">Total Payments</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <div className="font-bold text-yellow-700 text-xl">{stats.pending}</div>
            <div className="text-yellow-600 text-sm font-medium">Pending</div>
            <div className="text-yellow-500 text-xs mt-1">{formatCurrency(stats.pendingRevenue)}</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
            <div className="font-bold text-green-700 text-xl">{stats.confirmed}</div>
            <div className="text-green-600 text-sm font-medium">Confirmed</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
            <div className="font-bold text-red-700 text-xl">{stats.rejected}</div>
            <div className="text-red-600 text-sm font-medium">Rejected</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
            <div className="font-bold text-purple-700 text-xl">{formatCurrency(stats.totalRevenue)}</div>
            <div className="text-purple-600 text-sm font-medium">Total Revenue</div>
          </div>
          <div className="text-center p-4 bg-indigo-50 rounded-lg border border-indigo-100">
            <div className="font-bold text-indigo-700 text-xl">{formatCurrency(stats.monthlyRevenue)}</div>
            <div className="text-indigo-600 text-sm font-medium">30-Day Revenue</div>
          </div>
        </div>

        {/* Payment Method Breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-700">{stats.creditCard}</div>
            <div className="text-gray-600 text-xs">Credit Card</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-700">{stats.paypal}</div>
            <div className="text-gray-600 text-xs">PayPal</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-700">{stats.bankTransfer}</div>
            <div className="text-gray-600 text-xs">Bank Transfer</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-700">{stats.onsite}</div>
            <div className="text-gray-600 text-xs">On-site</div>
          </div>
        </div>
      </section>

      {/* Payments Table */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Payment Transactions ({filteredPayments.length})
          </h3>
          <div className="text-sm text-gray-600">
            Showing {filteredPayments.length} of {payments.length} payments
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-2">Loading payments...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-8 text-red-600 bg-red-50 rounded-lg">
            Failed to load payments. Please try again.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">ID</th>
                  <th className="px-4 py-3 text-left font-medium">Citizen</th>
                  <th className="px-4 py-3 text-left font-medium">Service</th>
                  <th className="px-4 py-3 text-left font-medium">Amount</th>
                  <th className="px-4 py-3 text-left font-medium">Method</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-left font-medium">Duration</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => {
                  const duration = Math.ceil(
                    (new Date(payment.updatedAt) - new Date(payment.createdAt)) / (1000 * 60 * 60 * 24)
                  );
                  
                  return (
                    <tr key={payment.id} className="border-b hover:bg-gray-50 group">
                      <td className="px-4 py-3 font-mono text-xs">#{payment.id}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium">{payment.User?.name || "N/A"}</div>
                        <div className="text-xs text-gray-500 truncate max-w-[120px]">
                          {payment.User?.email}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium">{payment.Request?.Service?.name || "N/A"}</div>
                        <div className="text-xs text-gray-500">Req: #{payment.request_id}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-gray-800">${payment.amount}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                          {payment.method?.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <PaymentStatusBadge status={payment.status} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-xs">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(payment.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          duration === 0 
                            ? "bg-green-100 text-green-800" 
                            : duration <= 1 
                            ? "bg-blue-100 text-blue-800"
                            : "bg-orange-100 text-orange-800"
                        }`}>
                          {duration === 0 ? "Same day" : `${duration}d`}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-2">
                          <Link 
                            to={`/admin/payments/${payment.id}`}
                            className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 text-center text-xs transition-colors"
                          >
                            View Details
                          </Link>
                          {getStatusActions(payment)}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredPayments.length === 0 && (
                  <tr>
                    <td colSpan="9" className="px-4 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        <p className="text-lg font-medium text-gray-600">No payments found</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Try adjusting your filters or check back later
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Summary Footer */}
      {filteredPayments.length > 0 && (
        <section className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>
              <span className="font-medium">Filtered Revenue: </span>
              {formatCurrency(
                filteredPayments
                  .filter(p => p.status === "confirmed")
                  .reduce((sum, p) => sum + parseFloat(p.amount), 0)
              )}
            </div>
            <div>
              <span className="font-medium">Average Amount: </span>
              {formatCurrency(
                filteredPayments.length > 0 
                  ? filteredPayments.reduce((sum, p) => sum + parseFloat(p.amount), 0) / filteredPayments.length
                  : 0
              )}
            </div>
            <div>
              <span className="font-medium">Success Rate: </span>
              {filteredPayments.length > 0 
                ? Math.round((filteredPayments.filter(p => p.status === "confirmed").length / filteredPayments.length) * 100)
                : 0
              }%
            </div>
          </div>
        </section>
      )}
    </div>
  );
}