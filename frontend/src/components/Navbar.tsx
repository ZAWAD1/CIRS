import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center gap-2">
        <img src="/Ulab-logo.png" alt="ULAB Logo" className="h-10" />
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/emergency"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Emergency Contacts
        </Link>
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

export default Navbar;
