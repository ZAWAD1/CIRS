import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Footer from "../components/Footer";
import NavforMRF from "../components/NavforMRF";

interface ReportType {
  report_id: number;
  title: string;
  status: string;
  is_anonymous: boolean;
  created_at: string;
}

export default function MyReportsPage() {
  const [reports, setReports] = useState<ReportType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("incident_reports")
      .select("report_id, title, status, is_anonymous, created_at")
      .eq("reporter_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setReports(data as ReportType[]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavforMRF />

      <div className="max-w-6xl mx-auto bg-white p-8 shadow mt-10 rounded mb-16">
        <h2 className="text-xl font-bold mb-6">Your Report List</h2>

        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading reports...</p>
        ) : reports.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No reports found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead className="bg-gray-100 text-gray-700 border-b">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Anonymity</th>
                  <th className="py-3 px-4 text-left">Details</th>
                </tr>
              </thead>

              <tbody>
                {reports.map((r) => (
                  <tr
                    key={r.report_id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{r.report_id}</td>

                    {/* FIXED TITLE */}
                    <td className="py-3 px-4">
                      {r.title}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded text-white text-xs ${
                          r.status === "New"
                            ? "bg-blue-600"
                            : r.status === "Investigating"
                            ? "bg-yellow-600"
                            : "bg-green-600"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      {r.is_anonymous ? (
                        <span className="text-gray-600">Anonymous</span>
                      ) : (
                        <span className="text-gray-600">Not Anonymous</span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <button
                        className="px-3 py-1 text-blue-600 underline"
                        onClick={() => navigate(`/report/${r.report_id}`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
