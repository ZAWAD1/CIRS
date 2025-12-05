import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import NavforSLI from "../components/NavforSLI";
import Footer from "../components/Footer";

const StudentLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 1. Login
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      return;
    }

    const user = data.user;
    if (!user) {
      setError("Login failed. Try again.");
      return;
    }

    // 2. Fetch the student's profile from your 'users' table
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      setError("Profile not found.");
      return;
    }

    // 3. Block if not student
    if (profile.role !== "student") {
      setError("This login is only for students.");
      return;
    }

    // 4. Redirect to student dashboard
    navigate("/student/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavforSLI />

      <div className="flex flex-1 justify-center items-center">
        <div className="w-full max-w-sm">
          <h2 className="text-xl font-bold mb-1">SIGN IN</h2>
          <p className="text-gray-400 text-sm mb-6">
            signin to your student dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold">EMAIL</label>
              <input
                type="email"
                className="w-full border-b p-2 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">PASSWORD</label>
              <input
                type="password"
                className="w-full border-b p-2 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded mt-4 shadow"
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

export default StudentLogin;
