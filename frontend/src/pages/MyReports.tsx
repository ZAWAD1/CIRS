import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import {
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

interface ReportType {
  report_id: number;
  title: string;
  category: string;
  status: string;
  created_at: string;
  image_url: string | null;
  is_anonymous: boolean;
}

export default function MyReportsPage() {
  const [reports, setReports] = useState<ReportType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchReports();
  }, []);

  // -------------------- FETCH REPORTS --------------------
  const fetchReports = async () => {
    const { data, error } = await supabase
      .from("incident_reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setReports(data as ReportType[]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* ---------------- NAVBAR ---------------- */}
      <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-sm border-b">
        <div className="flex items-center gap-3">
          <img src="/Ulab-logo.png" alt="ULAB Logo" className="h-12" />
        </div>

        <div className="flex items-center gap-8 text-sm">
          <a href="/report-incident" className="text-gray-700 hover:text-blue-600">
            Report Incident
          </a>

          <a
            href="/student/my-reports"
            className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
          >
            My Reports
          </a>

          <a href="/emergency" className="text-gray-700 hover:text-blue-600">
            Emergency Contacts
          </a>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm">
            LOGOUT
          </button>
        </div>
      </nav>

      {/* ---------------- BODY ---------------- */}
      <div className="max-w-6xl mx-auto bg-white p-8 shadow mt-10 rounded mb-16">
        <h2 className="text-xl font-bold mb-6">My Reports</h2>

        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading reports...</p>
        ) : reports.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No reports found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead className="bg-gray-100 text-gray-700 border-b">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {reports.map((r) => (
                  <tr
                    key={r.report_id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{r.report_id}</td>
                    <td className="py-3 px-4">
                      {r.is_anonymous ? "Anonymous Report" : r.title}
                    </td>
                    <td className="py-3 px-4">{r.category}</td>

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
                      {r.image_url ? (
                        <img
                          src={r.image_url}
                          alt="incident"
                          className="h-12 w-12 rounded object-cover border"
                        />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      {r.created_at?.slice(0, 10)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="border-t bg-white text-gray-600 p-6">
        <div className="max-w-7xl mx-auto flex justify-between">

          <div className="text-sm">
            University of Liberal Arts Bangladesh
            <div className="flex gap-4 mt-4 text-gray-500">
              <FaFacebook />
              <FaLinkedin />
              <FaYoutube />
              <FaInstagram />
            </div>
          </div>

          <div className="text-xs text-right">
            <p>Property Of Team</p>
            <p className="font-bold">DUCKLINGS</p>
          </div>

        </div>
      </footer>
    </div>
  );
}
