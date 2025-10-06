import { Link, Outlet } from "react-router-dom";
import NotificationBell from "../ui/NotificationBell";
import LogoutButton from "../ui/LogoutButton";

const CitizenLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b font-bold text-blue-600 text-xl">
          Citizen Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/citizen/dashboard" className="block hover:text-blue-600">Dashboard</Link>
          <Link to="/citizen/services" className="block hover:text-blue-600">Services</Link>
          <Link to="/citizen/requests" className="block hover:text-blue-600">My Requests</Link>
          <Link to="/citizen/payments" className="block hover:text-blue-600">Payments</Link>
          <Link to="/citizen/notifications" className="block hover:text-blue-600">Notifications</Link>
          <Link to="/citizen/profile" className="block hover:text-blue-600">Profile</Link>
        </nav>

        {/* Logout at bottom */}
        <div className="p-4 border-t">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-4 bg-white shadow-sm">
          <h1 className="text-lg font-semibold">Citizen Dashboard</h1>
          <NotificationBell />
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CitizenLayout;
