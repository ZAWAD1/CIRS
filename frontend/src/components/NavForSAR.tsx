import { Link } from "react-router-dom";

const NavForSAR = () => {
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center gap-2">
        <img src="/Ulab-logo.png" alt="ULAB Logo" className="h-10" />
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/dashboard"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Dashboard
        </Link>
        <Link
          to="/report-incident"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Report Incident
        </Link>
        <Link
          to="/emergency"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Emergency Contact
        </Link>
      </div>
    </nav>
  );
};

export default NavForSAR;
