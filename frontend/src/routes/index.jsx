import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";

// Layouts
import PublicLayout from "../components/layout/PublicLayout";
import CitizenLayout from "../components/layout/CitizenLayout";
import OfficerLayout from "../components/layout/OfficerLayout";
import DheadLayout from "../components/layout/DheadLayout";
import AdminLayout from "../components/layout/AdminLayout";

// Public Pages
import LandingPage from "../pages/public/LandingPage";
import LoginPage from "../pages/public/LoginPage";
import RegisterPage from "../pages/public/RegisterPage";
import AboutPage from "../pages/public/AboutPage";
import ContactPage from "../pages/public/ContactPage";

// Error Pages
import NotFound from "../pages/error/NotFound";
import Unauthorized from "../pages/error/Unauthorized";

// Role-Based Pages
import CitizenDashboard from "../pages/citizen/Dashboard";
import OfficerDashboard from "../pages/officer/Dashboard";
import DheadDashboard from "../pages/dhead/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Protected Citizen Routes */}
        <Route
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["citizen"]}>
                <CitizenLayout />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        >
          <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
        </Route>

        {/* Protected Officer Routes */}
        <Route
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["officer"]}>
                <OfficerLayout />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        >
          <Route path="/officer/dashboard" element={<OfficerDashboard />} />
        </Route>

        {/* Protected Department Head Routes */}
        <Route
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["dhead"]}>
                <DheadLayout />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        >
          <Route path="/dhead/dashboard" element={<DheadDashboard />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Error Routes */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
