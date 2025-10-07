import { Link, Outlet } from "react-router-dom";
import NotificationBell from "../ui/NotificationBell";
import LogoutButton from "../ui/LogoutButton";

const DheadLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <Link to="/" className="text-xl p-4 border-b font-bold text-blue-600">
          E-Gov Portal
        </Link>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dhead/dashboard" className="block hover:text-purple-600">Dashboard</Link>
          <Link to="/dhead/users" className="block hover:text-purple-600">User Management</Link>
          <Link to="/dhead/requests" className="block hover:text-purple-600">Requests</Link>
          <Link to="/dhead/payments" className="block hover:text-purple-600">Payments</Link>
          <Link to="/dhead/services" className="block hover:text-purple-600">Services</Link>
          <Link to="/dhead/notifications" className="block hover:text-purple-600">Notifications</Link>
          <Link to="/dhead/profile" className="block hover:text-purple-600">Profile</Link>
        </nav>

        {/* Logout Button pinned at bottom */}
        <div className="p-4 border-t">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-4 bg-white shadow-sm">
          <h1 className="text-lg font-semibold">Department Head Dashboard</h1>
          <NotificationBell />
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DheadLayout;
