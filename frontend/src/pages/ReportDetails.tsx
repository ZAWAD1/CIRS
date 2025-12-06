import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import NavforMRF from "../components/NavforMRF";
import Footer from "../components/Footer";

interface Report {
  report_id: number;
  title: string;
  status: string;
  is_anonymous: boolean;
  created_at: string;
  category: string;
  date_of_incident: string;
  time_of_incident: string;
  location: string;
  description: string;
  image_url?: string;
}

export default function ReportDetails() {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchReportDetails();
  }, []);

  const fetchReportDetails = async () => {
    if (!id) return;

    const numericId = Number(id);

    const { data, error } = await supabase
      .from("incident_reports")
      .select("*")
      .eq("report_id", numericId)
      .single();

    if (!error && data) {
      setReport(data as Report);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading report...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">Report not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavforMRF />

      <div className="max-w-3xl mx-auto bg-white p-8 shadow mt-10 rounded mb-16">
        <h2 className="text-2xl font-bold mb-4">
          {report.is_anonymous ? "Anonymous Report" : report.title}
        </h2>

        <div className="text-sm text-gray-600 mb-6">
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-3 py-1 rounded text-white text-xs ${
                report.status === "New"
                  ? "bg-blue-600"
                  : report.status === "Investigating"
                  ? "bg-yellow-600"
                  : "bg-green-600"
              }`}
            >
              {report.status}
            </span>
          </p>

          <p className="mt-2">
            <strong>Submitted On:</strong>{" "}
            {new Date(report.created_at).toLocaleString()}
          </p>
        </div>

        <div className="space-y-4 text-gray-800">
          <p><strong>Category:</strong> {report.category}</p>
          <p><strong>Date of Incident:</strong> {report.date_of_incident}</p>
          <p><strong>Time of Incident:</strong> {report.time_of_incident}</p>
          <p><strong>Location:</strong> {report.location}</p>
          <p>
            <strong>Description:</strong>
            <br />
            {report.description}
          </p>

          {report.image_url && (
            <div className="mt-4">
              <strong>Image Evidence:</strong>
              <br />
              <img
                src={report.image_url}
                alt="Incident Evidence"
                className="w-full mt-2 rounded shadow"
              />
            </div>
          )}
        </div>

        <button
          onClick={() => window.history.back()}
          className="mt-8 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back
        </button>
      </div>

      <Footer />
    </div>
  );
}
