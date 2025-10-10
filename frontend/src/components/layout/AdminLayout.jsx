import { Link, Outlet, useLocation } from "react-router-dom";
import NotificationBell from "../ui/NotificationBell";
import LogoutButton from "../ui/LogoutButton";
import { useGetProfileQuery } from "../../redux/services/authApiSlice";

const AdminLayout = () => {
  const location = useLocation();
  const { data: user } = useGetProfileQuery();

  const menuItems = [
    { path: "/admin/analytics", label: "Portal Analytics", icon: "📊" },
    { path: "/admin/users", label: "User Management", icon: "👥" },
    { path: "/admin/requests", label: "Request Management", icon: "📋" },
    { path: "/admin/services", label: "Service Management", icon: "🛠️" },
    { path: "/admin/departments", label: "Department Management", icon: "🏢" },
    { path: "/admin/payments", label: "Payment Management", icon: "💳" },
    { path: "/admin/notifications", label: "Notifications", icon: "🔔" },
    { path: "/admin/profile", label: "Profile", icon: "👤" },
  ];

  const isActiveLink = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const getUserInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'A';
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-100">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EG</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">E-Gov Portal</h1>
              <p className="text-gray-500 text-xs">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-150 group ${
                isActiveLink(item.path)
                  ? "bg-blue-50 text-blue-600 border border-blue-100"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
              {isActiveLink(item.path) && (
                <div className="ml-auto w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              )}
            </Link>
          ))}
        </nav>

        {/* User Profile & Logout Section */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center space-x-3 mb-3 p-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200">
              <span className="text-blue-600 font-medium text-sm">
                {getUserInitials(user?.name)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-800 font-medium text-sm truncate">
                {user?.name || 'Admin User'}
              </p>
              <p className="text-gray-500 text-xs">Administrator</p>
            </div>
          </div>
          <LogoutButton className="w-full text-gray-600 hover:text-gray-800 hover:bg-gray-50 py-2 px-3 rounded-lg transition-colors duration-150 border border-gray-200 text-sm font-medium" />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex justify-between items-center px-6 py-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                {menuItems.find(item => isActiveLink(item.path))?.label || "Dashboard"}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Welcome to your administration panel
              </p>
            </div>
            <div className="flex items-center space-x-4 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{getUserInitials(user?.name)}</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-blue-800">{user?.name || 'Admin User'}</p>
                  <p className="text-xs text-blue-600">Administrator</p>
                </div>
              </div>
              <div className="border-l border-blue-200 h-8 mx-2"></div>
              <NotificationBell />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;