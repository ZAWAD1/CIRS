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

      <main className="flex flex-col md:flex-row justify-between items-center flex-grow px-8 py-10">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold mb-3">Select Your Role</h1>

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
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Proceed to Login
          </button>
        </div>

        <div className="mt-10 md:mt-0">
          <img
            src="/Features.png"
            alt="Campus Rules"
            className="w-[350px] rounded-lg shadow"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RoleSelect;
