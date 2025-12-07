import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import NavforMRF from "../components/NavforMRF";
import Footer from "../components/Footer";

interface IncidentReport {
  report_id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  created_at: string;
  date_of_incident: string;
  time_of_incident: string;
  status: string;
  is_anonymous: boolean;
  image_url: string | null;
  reporter_id: string | null;
}

export default function ReportDetails() {
  const { id } = useParams();
  const [report, setReport] = useState<IncidentReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportDetails();
  }, []);

  const fetchReportDetails = async () => {
    const { data, error } = await supabase
      .from("incident_reports")
      .select("*")
      .eq("report_id", id)
      .single();

    if (!error) {
      setReport(data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading report details...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 text-lg">Report not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavforMRF />

      <div className="max-w-4xl mx-auto mt-10 mb-20 bg-white p-10 rounded-xl shadow-md border border-gray-200">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {report.is_anonymous ? "Anonymous Report" : report.title}
        </h1>

        {/* Report Meta */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-2">
          <p className="text-gray-600">
            <strong>Report ID:</strong> #{report.report_id}
          </p>

          <span
            className={`mt-3 md:mt-0 px-4 py-1 w-fit rounded-full text-white text-sm font-medium
              ${
                report.status === "New"
                  ? "bg-blue-600"
                  : report.status === "Investigating"
                  ? "bg-yellow-600"
                  : "bg-green-600"
              }`}
          >
            {report.status}
          </span>
        </div>

        <hr className="my-6" />

        {/* Report Details */}
        <div className="space-y-5 text-gray-800">

          <div>
            <p className="text-sm font-semibold text-gray-500">Category</p>
            <p className="text-lg">{report.category}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-gray-500">
                Date of Incident
              </p>
              <p className="text-lg">{report.date_of_incident}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500">
                Time of Incident
              </p>
              <p className="text-lg">{report.time_of_incident}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500">Location</p>
            <p className="text-lg">{report.location}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500">Submitted On</p>
            <p className="text-lg">
              {new Date(report.created_at).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500">Description</p>
            <p className="text-lg leading-relaxed mt-1">{report.description}</p>
          </div>

          {/* Image Evidence */}
          {report.image_url && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-500 mb-2">
                Image Evidence
              </p>
              <img
                src={report.image_url}
                alt="Incident Evidence"
                className="w-full rounded-xl shadow-sm border border-gray-300 hover:shadow-lg transition"
              />
            </div>
          )}
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="mt-10 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
          transition font-medium shadow-sm"
        >
          ← Back to Reports
        </button>
      </div>

      <Footer />
    </div>
  );
}
