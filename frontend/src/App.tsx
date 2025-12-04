import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoleSelect from "./pages/RoleSelect";
import StudentAllReport from "./pages/StudentAllReport";
import StudentDashboard from "./pages/StudentDashboard";
import StudentEmergencyContact from "./pages/StudentEmergencyContact";
import EmergencyContacts from "./pages/EmergencyContacts";
import AdminDashboard from "./pages/AdminDashboard";
import EmergencyContactsAdmin from "./pages/EmergencyContactsAdmin";
import AdminLogin from "./pages/AdminLogin";
import StudentSignup from "./pages/StudentSignup";
import StudentLogin from "./pages/StudentLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/roles" element={<RoleSelect />} />
      <Route path="/student/reports" element={<StudentAllReport />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/emergency" element={<StudentEmergencyContact />} />
      <Route path="/home-emergency" element={<EmergencyContacts />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/emergency" element={<EmergencyContactsAdmin />} />
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/signup/student" element={<StudentSignup />} />
      <Route path="/login/student" element={<StudentLogin />} />
    </Routes>
  );
}

export default App;
