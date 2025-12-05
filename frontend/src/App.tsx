import { Routes, Route } from "react-router-dom";

// Main Pages
import Home from "./pages/Home";
import RoleSelect from "./pages/RoleSelect";

// Student Pages
import IncidentForm from "./pages/IncidentForm";
import MyReports from "./pages/MyReports";
import StudentAllReport from "./pages/StudentAllReport";
import StudentDashboard from "./pages/StudentDashboard";
import StudentEmergencyContact from "./pages/StudentEmergencyContact";
import EmergencyContacts from "./pages/EmergencyContacts";
import AdminDashboard from "./pages/AdminDashboard";
import EmergencyContactsAdmin from "./pages/EmergencyContactsAdmin";
import AdminLogin from "./pages/AdminLogin";
import StudentSignup from "./pages/StudentSignup";
import StudentLogin from "./pages/StudentLogin";
import AdminSignup from "./pages/AdminSignup";

function App() {
  return (
    <Routes>

      {/* ===========================
          PUBLIC ROUTES
      ============================ */}
      <Route path="/" element={<Home />} />
      <Route path="/roles" element={<RoleSelect />} />

      {/* ===========================
          STUDENT ROUTES
      ============================ */}

      {/* Report Form */}
      <Route path="/report-incident" element={<IncidentForm />} />

      {/* Student Report Pages */}
      <Route path="/student/my-reports" element={<MyReports />} />
      <Route path="/student/reports" element={<StudentAllReport />} />

      {/* Student Dashboard */}
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/emergency" element={<StudentEmergencyContact />} />
      <Route path="/home-emergency" element={<EmergencyContacts />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/emergency" element={<EmergencyContactsAdmin />} />
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/signup/student" element={<StudentSignup />} />
      <Route path="/login/student" element={<StudentLogin />} />
      <Route path="/signup/admin" element={<AdminSignup />} />

      {/* Duplicate Removed */}
      {/* <Route path="/my-report" element={<MyReports />} /> */}

    </Routes>
  );
}

export default App;
