import { Link } from "react-router-dom";

const NavforIRF = () => {
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center gap-2">
        <img src="/Ulab-logo.png" alt="ULAB Logo" className="h-10" />
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/student/dashboard"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/student/my-reports"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          My Report
        </Link>

        <Link
          to="/student/emergency"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Emergency Contacts
        </Link>

        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          LOGOUT
        </Link>
      </div>
    </nav>
  );
};

export default NavforIRF;
