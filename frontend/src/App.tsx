import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import IncidentForm from "./pages/IncidentForm";
import MyReports from "./pages/MyReports";

export default function App() {
  return (
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
  );
}
