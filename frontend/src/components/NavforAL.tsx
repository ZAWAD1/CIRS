import { Link } from "react-router-dom";

const NavforAL = () => {
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center gap-2">
        <img src="/Ulab-logo.png" alt="ULAB Logo" className="h-10" />
      </div>

      <div className="flex items-center gap-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
          Home
        </Link>
      </div>
    </nav>
  );
};

export default NavforAL;
