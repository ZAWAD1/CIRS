import { FaFacebook, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t bg-white text-gray-600 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col items-center md:items-start text-sm leading-tight">
          <p className="font-medium mb-10">
            University Of Liberal Arts Bangladesh
          </p>
          <div className="flex gap-3 text-gray-500">
            <a href="#" className="hover:text-blue-600 transition">
              <FaFacebook size={16} />
            </a>
            <a href="#" className="hover:text-blue-700 transition">
              <FaLinkedin size={16} />
            </a>
            <a href="#" className="hover:text-red-600 transition">
              <FaYoutube size={16} />
            </a>
            <a href="#" className="hover:text-pink-600 transition">
              <FaInstagram size={16} />
            </a>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-center md:items-end text-[12px] mt-6 md:mt-5 leading-tight">
          <span className="mb-3">Property Of Team</span>
          <span className="font-semibold tracking-wide uppercase">DUCKLINGS</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
