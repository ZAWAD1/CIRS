import { Routes, Route } from "react-router-dom";
<<<<<<< Updated upstream
import Home from "./pages/Home";
import RoleSelect from "./pages/RoleSelect";
import StudentAllReport from "./pages/StudentAllReport";
=======
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import IncidentForm from "./pages/IncidentForm";
import MyReports from "./pages/MyReports";
>>>>>>> Stashed changes

export default function App() {
  return (
<<<<<<< Updated upstream
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/roles" element={<RoleSelect />} />
      <Route path="/student/reports" element={<StudentAllReport />} />
    </Routes>
=======
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow px-6 py-8">
        <Routes>
          <Route path="/" element={<IncidentForm />} />
          <Route path="/report" element={<IncidentForm />} />
          <Route path="/my-reports" element={<MyReports />} />
        </Routes>
      </main>

      <Footer />
    </div>
>>>>>>> Stashed changes
  );
}
