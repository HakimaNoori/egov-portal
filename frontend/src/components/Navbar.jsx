import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  // Mock user role (replace with actual auth logic)
  const userRole = "citizen"; // Can be 'citizen', 'officer', or 'admin'

  const handleLogout = () => {
    // Implement logout logic (e.g., clear token)
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          E-Gov Portal
        </Link>
        <div className="space-x-4">
          {userRole === "citizen" && (
            <>
              <Link to="/citizen/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link to="/citizen/apply" className="hover:underline">
                Apply
              </Link>
              <Link to="/citizen/requests" className="hover:underline">
                Requests
              </Link>
              <Link to="/citizen/profile" className="hover:underline">
                Profile
              </Link>
            </>
          )}
          {userRole === "officer" && (
            <>
              <Link to="/officer/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </>
          )}
          {userRole === "admin" && (
            <>
              <Link to="/admin/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link to="/admin/departments" className="hover:underline">
                Departments
              </Link>
              <Link to="/admin/services" className="hover:underline">
                Services
              </Link>
              <Link to="/admin/users" className="hover:underline">
                Users
              </Link>
              <Link to="/admin/reports" className="hover:underline">
                Reports
              </Link>
            </>
          )}
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
