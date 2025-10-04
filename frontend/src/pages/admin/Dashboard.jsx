// src/pages/admin/Dashboard.jsx
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/admin/departments"
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-blue-600">
            Manage Departments
          </h2>
          <p className="text-gray-600 mt-2">
            Add, edit, or delete departments.
          </p>
        </Link>
        <Link
          to="/admin/services"
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-blue-600">
            Manage Services
          </h2>
          <p className="text-gray-600 mt-2">
            Configure services for each department.
          </p>
        </Link>
        <Link
          to="/admin/users"
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-blue-600">Manage Users</h2>
          <p className="text-gray-600 mt-2">
            View and edit citizens, officers, and admins.
          </p>
        </Link>
        <Link
          to="/admin/reports"
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-blue-600">View Reports</h2>
          <p className="text-gray-600 mt-2">See statistics and analytics.</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
