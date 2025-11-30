import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoleSelect from "./pages/RoleSelect";
import StudentAllReport from "./pages/StudentAllReport";
import StudentDashboard from "./pages/StudentDashboard";
import StudentEmergencyContact from "./pages/StudentEmergencyContact";
import EmergencyContacts from "./pages/EmergencyContacts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/roles" element={<RoleSelect />} />
      <Route path="/student/reports" element={<StudentAllReport />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/emergency" element={<StudentEmergencyContact />} />
      <Route path="/home-emergency" element={<EmergencyContacts />} />
    </Routes>
  );
}

export default App;
