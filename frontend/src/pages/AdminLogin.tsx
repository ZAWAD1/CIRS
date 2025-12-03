import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import NavforAL from "../components/NavforAL";
import Footer from "../components/Footer";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password");
      return;
    }

    // If login is successful → this IS your admin
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar stays at the top */}
      <NavforAL />

      {/* Center only the login section */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-sm p-8">
          <h2 className="text-xl font-bold">SIGN IN</h2>
          <p className="text-gray-500 text-sm mb-6">
            sign in to your admin dashboard
          </p>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-semibold">EMAIL</label>
              <input
                type="email"
                className="w-full border-b p-2 outline-none focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold">PASSWORD</label>
              <input
                type="password"
                className="w-full border-b p-2 outline-none focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              SIGN IN
            </button>
          </form>
        </div>
      </div>

      {/* Footer stays at the bottom */}
      <Footer />
    </div>
  );
};

export default AdminLogin;
