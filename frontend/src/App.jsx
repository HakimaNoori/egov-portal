import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CitizenDashboard from "./pages/citizen/Dashboard";
import ApplyService from "./pages/citizen/ApplyService";
import RequestStatus from "./pages/citizen/RequestStatus";
import Profile from "./pages/citizen/Profile";
import CitizenLogin from "./pages/citizen/Login";
import OfficerDashboard from './pages/officer/Dashboard';
import RequestDetail from "./pages/officer/RequestDetail";
import OfficerLogin from "./pages/officer/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import ManageDepartments from "./pages/admin/ManageDepartments";
import ManageServices from "./pages/admin/ManageServices";
import ManageUsers from "./pages/admin/ManageUsers";
import Reports from "./pages/admin/Reports";
import Register from "./pages/citizen/register";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            {/* Citizen Routes */}
            <Route path="/citizen/login" element={<CitizenLogin />} />
            <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
            <Route path="/citizen/apply" element={<ApplyService />} />
            <Route path="/citizen/requests" element={<RequestStatus />} />
            <Route path="/citizen/profile" element={<Profile />} />
            <Route path="/citizen/register" element={<Register />} />
            {/* Officer Routes */}
            <Route path="/officer/login" element={<OfficerLogin />} />
            <Route path="/officer/dashboard" element={<OfficerDashboard />} />
            <Route path="/officer/requests/:id" element={<RequestDetail />} />
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/departments" element={<ManageDepartments />} />
            <Route path="/admin/services" element={<ManageServices />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/" element={<CitizenLogin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
