import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Footer from "../components/Footer";
import NavForSAR from "../components/NavForSAR";

interface Report {
  report_id: number;
  title: string;
  status: string;
}

const StudentAllReport = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("incident_reports")
        .select("report_id, title, status")
        .order("report_id", { ascending: false });

      if (error) console.error("Error fetching reports:", error);
      else setReports(data || []);
      setLoading(false);
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavForSAR />

      {/* Main Content */}
      <main className="flex-grow px-8 py-10">
        <h1 className="text-3xl font-semibold mb-6">Total Reports</h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : reports.length === 0 ? (
          <p className="text-gray-500">No reports found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-left text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.report_id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{report.title}</td>
                    <td
                      className={`px-4 py-2 border font-medium ${
                        report.status === "Resolved"
                          ? "text-green-600"
                          : report.status === "In Progress"
                          ? "text-yellow-600"
                          : "text-gray-600"
                      }`}
                    >
                      {report.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default StudentAllReport;
