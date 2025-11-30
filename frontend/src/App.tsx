import { Routes, Route } from "react-router-dom";

// Main Pages
import Home from "./pages/Home";
import RoleSelect from "./pages/RoleSelect";

// Student Pages
import IncidentForm from "./pages/IncidentForm";
import MyReports from "./pages/MyReports";
import StudentAllReport from "./pages/StudentAllReport";


function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Choose Student/Admin */}
      <Route path="/roles" element={<RoleSelect />} />


      {/* Student Actions */}
      <Route path="/report-incident" element={<IncidentForm />} />
      <Route path="/student/my-reports" element={<MyReports />} />
      <Route path="/student/reports" element={<StudentAllReport />} />

      {/* Emergency Page */}
      <Route
        path="/emergency"
        element={<div>Emergency Contact Page Coming...</div>}
      />

      {/* Dashboard Placeholder */}
      <Route path="/dashboard" element={<div>Dashboard Coming Soon...</div>} />
    </Routes>
  );
}

export default App;
