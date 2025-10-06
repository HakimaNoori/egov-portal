import { Link, Outlet } from "react-router-dom";
import NotificationBell from "../ui/NotificationBell";
import LogoutButton from "../ui/LogoutButton";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b font-bold text-red-600 text-xl">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/dashboard" className="block hover:text-red-600">Dashboard</Link>
          <Link to="/admin/users" className="block hover:text-red-600">Users</Link>
          <Link to="/admin/departments" className="block hover:text-red-600">Departments</Link>
          <Link to="/admin/services" className="block hover:text-red-600">Services</Link>
          <Link to="/admin/requests" className="block hover:text-red-600">Requests</Link>
          <Link to="/admin/payments" className="block hover:text-red-600">Payments</Link>
          <Link to="/admin/notifications" className="block hover:text-red-600">Notifications</Link>
          <Link to="/admin/profile" className="block hover:text-red-600">Profile</Link>
        </nav>

        {/* Logout Button pinned at bottom */}
        <div className="p-4 border-t">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-4 bg-white shadow-sm">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <NotificationBell />
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
