import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import NavforSSU from "../components/NavforSSU";
import Footer from "../components/Footer";

const AdminSignup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // 1. Create auth user
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setLoading(false);
      setErrorMsg(error.message);
      return;
    }

    const userId = data.user?.id;
    if (!userId) {
      setLoading(false);
      setErrorMsg("Signup failed. Please try again.");
      return;
    }

    const { error: insertError } = await supabase.from("users").insert([
      {
        id: userId,
        full_name: form.full_name,
        email: form.email,
        role: "admin",
        phone: form.phone,
        created_at: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      setErrorMsg(insertError.message);
      setLoading(false);
      return;
    }

    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <NavforSSU />

      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-10 w-[60%]"
        >
          <h2 className="col-span-2 text-xl font-semibold">Admin Sign up</h2>
          <p className="col-span-2 text-gray-400 text-sm -mt-4">
            Sign up as an admin
          </p>

          <div>
            <label className="text-xs font-semibold">FULL NAME</label>
            <input
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              className="w-full border-b outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold">EMAIL</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border-b outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold">PASSWORD</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border-b outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold">PHONE NUMBER</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border-b outline-none"
            />
          </div>

          {errorMsg && (
            <p className="col-span-2 text-red-500 text-sm">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="col-span-2 bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700"
          >
            {loading ? "Signing up..." : "SIGN UP"}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default AdminSignup;
