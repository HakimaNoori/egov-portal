import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetAllPaymentsQuery } from "../../redux/services/paymentApiSlice";
import { useListDepartmentsQuery } from "../../redux/services/departmentApiSlice";
import { useGetProfileQuery } from "../../redux/services/authApiSlice";
import PaymentStatusBadge from "../../components/payments/PaymentStatusBadge";

export default function DHeadPayments() {
  const { data: payments = [], isLoading, isError } = useGetAllPaymentsQuery();
  const { data: departments = [] } = useListDepartmentsQuery();
  const { data: userProfile } = useGetProfileQuery();
  const [statusFilter, setStatusFilter] = useState("all");

  // Get department head's department from user profile
  const userDepartment = useMemo(() => {
    if (!userProfile?.department_id) return null;
    return departments.find(dept => dept.id === userProfile.department_id);
  }, [userProfile, departments]);

  // Get department-specific payments
  const departmentPayments = useMemo(() => {
    if (!userDepartment?.id) return [];
    
    return payments.filter(payment => 
      payment.Request?.Service?.department_id === userDepartment.id
    );
  }, [payments, userDepartment]);

  // Filter payments based on status
  const filteredPayments = departmentPayments.filter(payment => 
    statusFilter === "all" || payment.status === statusFilter
  );

  // Calculate department-specific statistics
  const stats = useMemo(() => ({
    total: departmentPayments.length,
    pending: departmentPayments.filter(p => p.status === "pending").length,
    confirmed: departmentPayments.filter(p => p.status === "confirmed").length,
    rejected: departmentPayments.filter(p => p.status === "rejected").length,
    totalRevenue: departmentPayments
      .filter(p => p.status === "confirmed")
      .reduce((sum, p) => sum + parseFloat(p.amount), 0),
    pendingRevenue: departmentPayments
      .filter(p => p.status === "pending")
      .reduce((sum, p) => sum + parseFloat(p.amount), 0),
  }), [departmentPayments]);

  // Show loading while checking user department
  if (isLoading || !userProfile) {
    return (
      <div className="p-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center">
          Loading department payments...
        </div>
      </div>
    );
  }

  // Show error if user is not assigned to a department
  if (!userDepartment) {
    return (
      <div className="p-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center text-red-600">
          <h2 className="text-xl font-semibold mb-2">Department Not Found</h2>
          <p className="text-gray-600 mb-4">
            You are not assigned to any department. Please contact administrator.
          </p>
          <p className="text-sm text-gray-500">
            User Department ID: {userProfile?.department_id || 'Not set'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {userDepartment?.name ? `${userDepartment.name} Payments` : 'Department Payments'}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Payments for services in your department
              {userDepartment?.name && ` - ${userDepartment.name}`}
            </p>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
        {/* Department Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="font-semibold text-blue-700 text-lg">{stats.total}</div>
            <div className="text-gray-600">Total Payments</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="font-semibold text-yellow-700 text-lg">{stats.pending}</div>
            <div className="text-gray-600">Pending</div>
            <div className="text-yellow-600 text-xs mt-1">${stats.pendingRevenue}</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="font-semibold text-green-700 text-lg">{stats.confirmed}</div>
            <div className="text-gray-600">Confirmed</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="font-semibold text-red-700 text-lg">{stats.rejected}</div>
            <div className="text-gray-600">Rejected</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="font-semibold text-purple-700 text-lg">${stats.totalRevenue}</div>
            <div className="text-gray-600">Department Revenue</div>
          </div>
        </div>

        {/* Department Info */}
        {userDepartment && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
            <p className="text-sm text-gray-600">
              <strong>Department:</strong> {userDepartment.name}
              {userDepartment.description && ` - ${userDepartment.description}`}
            </p>
          </div>
        )}
      </section>

      {/* Payments Table */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        {isError ? (
          <div className="text-center py-8 text-red-600">Failed to load payments</div>
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
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">#{payment.id}</td>
                    <td className="px-4 py-3">
                      {payment.User?.name || "N/A"}

                      <div className="text-xs text-gray-500">{payment.User?.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      {payment.Request?.Service?.name || "N/A"}
                      <div className="text-xs text-gray-500">Req: #{payment.request_id}</div>
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
                        to={`/dhead/payments/${payment.id}`}
                        className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 text-center text-xs"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
                {filteredPayments.length === 0 && (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                      {departmentPayments.length === 0 ? (
                        <div>
                          <p>No payments found for your department</p>
                          <p className="text-sm text-gray-400 mt-1">
                            Payments will appear here when citizens pay for services in {userDepartment?.name || 'your department'}
                          </p>
                        </div>
                      ) : (
                        "No payments match the current filter"
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}