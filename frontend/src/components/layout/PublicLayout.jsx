import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../ui/LogoutButton";

const PublicLayout = () => {
  const user = useSelector((state) => state.auth.user); // get logged-in user

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          E-Gov Portal
        </Link>

        <nav className="space-x-4 flex items-center">
          {/* Always visible links */}
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>

          {/* Authenticated vs Unauthenticated */}
          {!user && (
            <>
              <Link to="/login" className="text-blue-600 font-medium">Login</Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-3 py-1 rounded-md"
              >
                Register
              </Link>
            </>
          )}

          {user && <LogoutButton />}
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
