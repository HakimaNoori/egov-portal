import React from "react";
import { Link, Outlet } from "react-router-dom";
import NotificationBell from "../ui/NotificationBell";

const DheadLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b font-bold text-purple-600 text-xl">
          Department Head
        </div>
        <nav className="p-4 space-y-2">
          <Link to="/dhead/dashboard" className="block hover:text-purple-600">Dashboard</Link>
          <Link to="/dhead/requests" className="block hover:text-purple-600">Requests</Link>
          <Link to="/dhead/payments" className="block hover:text-purple-600">Payments</Link>
          <Link to="/dhead/services" className="block hover:text-purple-600">Services</Link>
          <Link to="/dhead/notifications" className="block hover:text-purple-600">Notifications</Link>
          <Link to="/dhead/profile" className="block hover:text-purple-600">Profile</Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-4 bg-white shadow-sm">
          <h1 className="text-lg font-semibold">Department Dashboard</h1>
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
