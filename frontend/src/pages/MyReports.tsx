import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

type Report = {
  report_id: number;
  title: string;
  status: string;
  is_anonymous: boolean;
};

export default function MyReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setReports([]);
      setLoading(false);
      return;
    }

    const { data: studentRow } = await supabase
      .from("users")
      .select("user_id")
      .eq("email", user.email)
      .maybeSingle();

    if (!studentRow) {
      setReports([]);
      setLoading(false);
      return;
    }

    const studentId = studentRow.user_id;

    const { data, error } = await supabase
      .from("incident_reports")
      .select("report_id, title, status, is_anonymous")
      .eq("reporter_id", studentId)
      .order("report_id", { ascending: false });

    if (!error && data) {
      setReports(data as Report[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-10 px-6">
      <h2 className="text-2xl font-bold mb-8">Your Report List</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left text-gray-600">
            <th className="py-3">ID</th>
            <th className="py-3">Title</th>
            <th className="py-3">Status</th>
            <th className="py-3">Anonymity</th>
            <th className="py-3">Details</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="py-6 text-center text-gray-500">
                Loading...
              </td>
            </tr>
          ) : reports.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-6 text-center text-gray-400">
                No reports found.
              </td>
            </tr>
          ) : (
            reports.map((r) => (
              <tr key={r.report_id} className="border-b hover:bg-gray-50">
                <td className="py-3">{r.report_id}</td>
                <td className="py-3">{r.title}</td>
                <td className="py-3">{r.status}</td>
                <td className="py-3">
                  {r.is_anonymous ? "Anonymous" : "Not Anonymous"}
                </td>
                <td className="py-3">
                  <button className="text-blue-600 hover:underline">View</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
