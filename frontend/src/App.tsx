import { Routes, Route } from "react-router-dom";

// Main Pages
import Home from "./pages/Home";
import RoleSelect from "./pages/RoleSelect";

// Student Pages
import IncidentForm from "./pages/IncidentForm";
import MyReports from "./pages/MyReports";
import StudentAllReport from "./pages/StudentAllReport";
import StudentDashboard from "./pages/StudentDashboard";
import StudentEmergencyContact from "./pages/StudentEmergencycontact";
import EmergencyContacts from "./pages/EmergencyContacts";

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

      {/* Emergency Contact Pages */}
      <Route path="/emergency" element={<StudentEmergencyContact />} />
      <Route path="/home-emergency" element={<EmergencyContacts />} />

      {/* Duplicate Removed */}
      {/* <Route path="/my-report" element={<MyReports />} /> */}

    </Routes>
  );
}

export default App;
