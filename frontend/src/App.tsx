import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoleSelect from "./pages/RoleSelect";
import StudentAllReport from "./pages/StudentAllReport";
import AdminDashboard from "./pages/AdminDashboard";
import EmergencyContactsAdmin from "./pages/EmergencyContactsAdmin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/roles" element={<RoleSelect />} />
      <Route path="/student/reports" element={<StudentAllReport />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/emergency" element={<EmergencyContactsAdmin />} />
    </Routes>
  );
}

export default App;
