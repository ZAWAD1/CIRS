import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      await supabase.auth.signOut();
      navigate("/");
    };

    doLogout();
  }, [navigate]);

  return null;
};

export default Logout;
