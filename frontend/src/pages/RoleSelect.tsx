import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RoleSelect = () => {
  const [role, setRole] = useState<string>("");

  const handleProceed = () => {
    if (!role) {
      alert("Please select a role!");
      return;
    }
    window.location.href = `/login/${role}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex flex-col md:flex-row items-center justify-center gap-20 flex-grow px-6">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-center md:text-left">
            Select Your Role
          </h1>

          <form className="flex flex-col gap-3 text-gray-700">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="student"
                onChange={(e) => setRole(e.target.value)}
              />
              Student
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="admin"
                onChange={(e) => setRole(e.target.value)}
              />
              Admin
            </label>
          </form>

          <button
            onClick={handleProceed}
            className="mt-6 bg-blue-600 text-white px-12 py-2 rounded hover:bg-blue-700 transition"
          >
            Proceed to Login
          </button>
        </div>

        <div className="flex justify-center md:justify-start">
          <img
            src="/Features.png"
            alt="Campus Rules"
            className="w-[320px] rounded-lg shadow"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RoleSelect;
