import { Link } from "react-router-dom";

const NavforSSU = () => {
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center gap-2">
        <img src="/Ulab-logo.png" alt="ULAB Logo" className="h-10" />
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/roles"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          LOGIN
        </Link>
      </div>
    </nav>
  );
};

export default NavforSSU;
