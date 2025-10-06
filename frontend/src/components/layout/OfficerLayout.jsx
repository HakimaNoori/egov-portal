import { Link, Outlet } from "react-router-dom";
import NotificationBell from "../ui/NotificationBell";
import LogoutButton from "../ui/LogoutButton";

const OfficerLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b font-bold text-green-600 text-xl">
          Officer Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/officer/dashboard" className="block hover:text-green-600">Dashboard</Link>
          <Link to="/officer/requests" className="block hover:text-green-600">Requests</Link>
          <Link to="/officer/notifications" className="block hover:text-green-600">Notifications</Link>
          <Link to="/officer/profile" className="block hover:text-green-600">Profile</Link>
        </nav>

        {/* Logout Button pinned at bottom */}
        <div className="p-4 border-t">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-4 bg-white shadow-sm">
          <h1 className="text-lg font-semibold">Officer Dashboard</h1>
          <NotificationBell />
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OfficerLayout;
