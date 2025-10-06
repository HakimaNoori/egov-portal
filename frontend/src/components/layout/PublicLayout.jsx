import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/services/authSlice";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const PublicLayout = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  // Determine dashboard route based on role
  const getDashboardRoute = () => {
    if (!user) return "/";
    switch (user.role) {
      case "citizen":
        return "/citizen/dashboard";
      case "officer":
        return "/officer/dashboard";
      case "dhead":
        return "/dhead/dashboard";
      case "admin":
        return "/admin/dashboard";
      default:
        return "/";
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          E-Gov Portal
        </Link>

        <nav className="space-x-4 flex items-center relative">
          <Link to="/about" className="hover:text-blue-600">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-600">
            Contact
          </Link>

          {!user ? (
            <>
              <Link to="/login" className="text-blue-600 font-medium">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-3 py-1 rounded-md"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative group">
              {/* Profile Icon */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center focus:outline-none"
              >
                <FaUserCircle className="text-2xl text-gray-600 hover:text-blue-600" />
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50 text-center">
                  <div className="px-4 py-2 border-b text-gray-700 font-medium">
                    {user.name}
                  </div>
                  <Link
                    to={getDashboardRoute()}
                    className="block px-4 py-2 text-blue-600 hover:bg-gray-100 text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-red-600 hover:bg-gray-100 text-center"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} E-Government Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default PublicLayout;
