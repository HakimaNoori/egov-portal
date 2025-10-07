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
import {
  CitizenDashboard,
  CitizenServicesList,
  CitizenServiceDetails,
  CitizenRequests,
  CitizenRequestDetails,
  CitizenPayments,
  CitizenPaymentDetails,
  CitizenNotifications,
  CitizenProfile,
} from "../pages/citizen";

import {
  OfficerDashboard,
  OfficerRequestsList,
  OfficerRequestDetails,
  OfficerNotifications,
  OfficerProfile,
} from "../pages/officer";

import {
  DheadDashboard,
  DheadRequestsList,
  DheadRequestDetails,
  DheadPaymentsList,
  DheadServicesList,
  DheadNotifications,
  DheadUserManagement,
  DheadProfile,
} from "../pages/dhead";

import {
  AdminDashboard,
  AdminUsersList,
  AdminDepartmentsList,
  AdminServicesList,
  AdminRequestsList,
  AdminPaymentsList,
  AdminNotifications,
  AdminProfile,
  AdminSettings
} from "../pages/admin";

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
          <Route path="/citizen/services" element={<CitizenServicesList />} />
          <Route path="/citizen/services/:id" element={<CitizenServiceDetails />} />
          <Route path="/citizen/requests" element={<CitizenRequests />} />
          <Route path="/citizen/requests/:id" element={<CitizenRequestDetails />} />
          <Route path="/citizen/payments" element={<CitizenPayments />} />
          <Route path="/citizen/payments/:id" element={<CitizenPaymentDetails />} />
          <Route path="/citizen/notifications" element={<CitizenNotifications />} />
          <Route path="/citizen/profile" element={<CitizenProfile />} />
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
          <Route path="/officer/requests" element={<OfficerRequestsList />} />
          <Route path="/officer/requests/:id" element={<OfficerRequestDetails />} />
          <Route path="/officer/notifications" element={<OfficerNotifications />} />
          <Route path="/officer/profile" element={<OfficerProfile />} />
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
          <Route path="/dhead/users" element={<DheadUserManagement />} />
          <Route path="/dhead/requests" element={<DheadRequestsList />} />
          <Route path="/dhead/requests/:id" element={<DheadRequestDetails />} />
          <Route path="/dhead/payments" element={<DheadPaymentsList />} />
          <Route path="/dhead/services" element={<DheadServicesList />} />
          <Route path="/dhead/notifications" element={<DheadNotifications />} />
          <Route path="/dhead/profile" element={<DheadProfile />} />
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
          <Route path="/admin/users" element={<AdminUsersList />} />
          <Route path="/admin/departments" element={<AdminDepartmentsList />} />
          <Route path="/admin/services" element={<AdminServicesList />} />
          <Route path="/admin/requests" element={<AdminRequestsList />} />
          <Route path="/admin/payments" element={<AdminPaymentsList />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>

        {/* Error Routes */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
