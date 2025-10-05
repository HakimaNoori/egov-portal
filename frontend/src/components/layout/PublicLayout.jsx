import React from "react";
import { Outlet, Link } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          E-Gov Portal
        </Link>
        <nav className="space-x-4">
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
          <Link to="/login" className="text-blue-600 font-medium">Login</Link>
          <Link to="/register" className="bg-blue-600 text-white px-3 py-1 rounded-md">
            Register
          </Link>
        </nav>
      </header>

      <main className="flex-1 p-6">
        <Outlet />
      </main>

      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} E-Government Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default PublicLayout;
