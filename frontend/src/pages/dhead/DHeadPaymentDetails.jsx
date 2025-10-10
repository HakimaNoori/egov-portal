import { useParams, Link } from "react-router-dom";
import { useGetAllPaymentsQuery } from "../../redux/services/paymentApiSlice";
import { useListDepartmentsQuery } from "../../redux/services/departmentApiSlice";
import { useGetProfileQuery } from "../../redux/services/authApiSlice";
import PaymentStatusBadge from "../../components/payments/PaymentStatusBadge";

export default function DHeadPaymentDetails() {
  const { id } = useParams();
  const { data: payments = [], isLoading, isError } = useGetAllPaymentsQuery();
  const { data: departments = [] } = useListDepartmentsQuery();
  const { data: userProfile } = useGetProfileQuery();

  const payment = payments.find((p) => p.id === parseInt(id));

  // Get department head's department from user profile
  const userDepartment = userProfile?.department_id 
    ? departments.find(dept => dept.id === userProfile.department_id)
    : null;

  // Check if payment belongs to department head's department
  const isDepartmentPayment = payment?.Request?.Service?.department_id === userDepartment?.id;

  if (isLoading || !userProfile) {
    return (
      <div className="p-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center">
          Loading payment details...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center text-red-600">
          Failed to load payment details
        </div>
      </div>
    );
  }

  if (!userDepartment) {
    return (
      <div className="p-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center text-red-600">
          <h2 className="text-xl font-semibold mb-2">Department Not Found</h2>
          <p>You are not assigned to any department.</p>
        </div>
      </div>
    );
  }

  if (!payment || !isDepartmentPayment) {
    return (
      <div className="p-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center text-gray-600">
          {!payment ? "Payment not found" : "Payment not available in your department"}
        </div>
        <div className="text-center mt-4">
          <Link 
            to="/dhead/payments" 
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Back to Department Payments
          </Link>
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
            <h2 className="text-xl font-semibold text-gray-800">Payment Details</h2>
            <div className="text-sm text-gray-600 mt-1">
              Payment #{payment.id} • {payment.Request?.Service?.name || "Service Payment"}
              {userDepartment?.name && ` • ${userDepartment.name} Department`}
            </div>
          </div>
          <Link 
            to="/dhead/payments" 
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Back to Payments
          </Link>
        </div>
      </section>

      {/* Payment Overview */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">Payment Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Payment ID</label>
              <p className="font-medium">#{payment.id}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Service</label>
              <p className="font-medium">{payment.Request?.Service?.name || "N/A"}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Amount</label>
              <p className="font-medium text-lg">${payment.amount}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Payment Method</label>
              <p className="font-medium capitalize">{payment.method?.replace('_', ' ')}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Status</label>
              <div className="font-medium">
                <PaymentStatusBadge status={payment.status} />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Citizen</label>
              <p className="font-medium">{payment.User?.name || "N/A"}</p>
              <p className="text-sm text-gray-500">{payment.User?.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Request ID</label>
              <p className="font-medium">#{payment.request_id}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Date</label>
              <p className="font-medium">{new Date(payment.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Department Information */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">Department Information</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500">Department</label>
              <p className="font-medium">{userDepartment?.name || "N/A"}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Service Category</label>
              <p className="font-medium">{payment.Request?.Service?.name || "N/A"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Status Information */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">Payment Status</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          {payment.status === "confirmed" && (
            <p className="text-green-600 font-medium">
              ✅ Payment confirmed by administrator
            </p>
          )}
          {payment.status === "rejected" && (
            <p className="text-red-600 font-medium">
              ❌ Payment rejected by administrator
            </p>
          )}
          {payment.status === "pending" && (
            <p className="text-yellow-600 font-medium">
              ⏳ Awaiting administrator approval
            </p>
          )}
        </div>
      </section>
    </div>
  );
}