import AdminLayout from "../../components/layout/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-600">
          Welcome, Admin. You have full system access including managing users,
          departments, services, and reviewing reports.
        </p>
      </div>
    </AdminLayout>
  );
}
