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

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      setError("Invalid email or password");
      return;
    }

    const userId = authData.user?.id;
    if (!userId) {
      setError("Login failed. Try again.");
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      setError("Profile not found");
      return;
    }

    if (profile.role !== "admin") {
      await supabase.auth.signOut();
      setError("You are not authorized to access admin panel");
      return;
    }

    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavforAL />

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
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold">PASSWORD</label>
              <input
                type="password"
                className="w-full border-b p-2 outline-none focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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

      <Footer />
    </div>
  );
};

export default AdminLogin;
