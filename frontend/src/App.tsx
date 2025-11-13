import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoleSelect from "./pages/RoleSelect";
import StudentAllReport from "./pages/StudentAllReport";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/roles" element={<RoleSelect />} />
      <Route path="/student/reports" element={<StudentAllReport />} />
    </Routes>
  );
}

export default App;
