import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm border-b">
      {/* Left: ULAB logo */}
      <div className="flex items-center gap-3">
        <img
          src="/Ulab-logo.png"
          alt="ULAB Logo"
          className="h-10 w-auto object-contain"
        />
      </div>

      {/* Right: Navigation Links */}
      <div className="flex items-center gap-6">
        <Link
          to="/report"
          className="text-gray-700 hover:text-blue-600 transition-colors"
        >
          Report Incident
        </Link>

        <Link
          to="/my-reports"
          className="text-gray-700 hover:text-blue-600 transition-colors"
        >
          My Reports
        </Link>

        <Link
          to="/emergency"
          className="text-gray-700 hover:text-blue-600 transition-colors"
        >
          Emergency Contacts
        </Link>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm">
          LOGOUT
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
