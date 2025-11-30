import Footer from "../components/Footer";
import NavforSDB from "../components/NavforSDB";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavforSDB />
      <main className="flex flex-col md:flex-row justify-between items-center flex-grow px-8 py-10 max-w-5xl mx-auto md:gap-10">
        <div className="max-w-md text-center md:text-left">
          <h1 className="text-3xl font-bold mb-3">Your safety, Your voice</h1>
          <p className="text-gray-600 mb-6">
            Submit reports, track updates, and stay informed — all in one secure
            platform.
          </p>
        </div>

        <div className="mt-10 md:mt-0 flex justify-center">
          <img
            src="/Features.png"
            alt="Fretures"
            className="w-[350px] rounded-lg shadow-md"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentDashboard;
