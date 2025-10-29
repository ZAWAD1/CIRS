import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-col md:flex-row justify-between items-center flex-grow px-8 py-10 max-w-5xl mx-auto md:gap-10">
        <div className="max-w-md text-center md:text-left">
          <h1 className="text-3xl font-bold mb-3">Report Anonymously</h1>
          <p className="text-gray-600 mb-6">
            Our campus is a safe and respectful space for everyone. To maintain
            that environment, certain behaviors are strictly prohibited. All
            students, staff, and visitors are expected to uphold honesty,
            responsibility, and respect for others and property.
          </p>
          <div className="mb-4">
            <span className="text-x mb-2">To Report</span>
          </div>
          <Link
            to="/roles"
            className="bg-blue-600 text-white px-20 py-2 rounded hover:bg-blue-700 transition"
          >
            LOGIN
          </Link>
        </div>

        <div className="mt-10 md:mt-0 flex justify-center">
          <img
            src="/Not-allowed.png"
            alt="Campus Rules"
            className="w-[350px] rounded-lg shadow-md"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
