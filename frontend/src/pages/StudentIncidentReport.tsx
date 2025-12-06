import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NavforSRF from "../components/NavforSRF";

interface UploadedFileInfo {
  file_url: string;
  file_type?: string | null;
}

const StudentIncidentReport: React.FC = () => {
  const navigate = useNavigate();

  // Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [dateOfIncident, setDateOfIncident] = useState("");
  const [timeOfIncident, setTimeOfIncident] = useState("");
  const [location, setLocation] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [details, setDetails] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // optional categories — replace or fetch dynamically if you want
  const categories = ["Safety", "Harassment", "Facility", "Health", "Other"];

  useEffect(() => {
    // simple auth guard: check session and role
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/student/login");
        return;
      }

      // optional: you could also fetch role from users table to ensure only students
      try {
        const { data: profile } = await supabase
          .from("users")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (profile && (profile as any).role !== "student") {
          // redirect or show error
          setError("Only students can file incident reports.");
        }
      } catch (err) {
        // ignore — optionally show an error
      }
    };

    checkAuth();
  }, [navigate]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setSuccess("");
    const chosen = e.target.files;
    if (!chosen) return;

    const arr = Array.from(chosen);
    setFiles(arr);
  };

  const uploadFile = async (file: File, reportId: number) => {
    // create a unique path
    const timestamp = Date.now();
    const rand = Math.floor(Math.random() * 1000000);
    const fileExt = file.name.split(".").pop();
    const path = `reports/${reportId}/${timestamp}_${rand}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("incident_images")
      .upload(path, file, { upsert: false });

    if (uploadError) throw uploadError;

    // get public url
    const { data: publicData } = supabase.storage
      .from("incident_images")
      .getPublicUrl(uploadData.path);

    return publicData.publicUrl as string;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");
    setSuccess("");

    // basic validation
    if (!title.trim()) {
      setError("Please provide an incident title.");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) throw new Error("Not authenticated");

      const reporter_id = session.user.id;

      // 1. insert into incident_reports
      const { data: insertData, error: insertError } = await supabase
        .from("incident_reports")
        .insert([
          {
            reporter_id,
            is_anonymous: isAnonymous,
            category: category || null,
            title: title,
            description: details,
            date_of_incident: dateOfIncident || null,
            time_of_incident: timeOfIncident || null,
            location: location || null,
            // optionally leave image_url null for now and fill after uploads
          },
        ])
        .select("report_id")
        .single();

      if (insertError) throw insertError;

      const reportId = (insertData as any).report_id as number;

      let firstImageUrl: string | null = null;

      // 2. Upload files (multiple) and insert into attachments table
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const f = files[i];
          try {
            const publicUrl = await uploadFile(f, reportId);

            if (!firstImageUrl) firstImageUrl = publicUrl;

            const { error: attachError } = await supabase
              .from("attachments")
              .insert([
                {
                  report_id: reportId,
                  file_url: publicUrl,
                  file_type: f.type || null,
                },
              ]);

            if (attachError) {
              console.warn(
                "Attachment insert failed for file",
                f.name,
                attachError
              );
            }
          } catch (upErr) {
            console.error("Upload failed for file", f.name, upErr);
            // continue to next file, but capture error to show to user
            setError((prev) => prev + ` Failed upload: ${f.name}.`);
          }
        }
      }

      // 3. If we uploaded at least one image, update incident_reports.image_url with the first image
      if (firstImageUrl) {
        const { error: updateError } = await supabase
          .from("incident_reports")
          .update({ image_url: firstImageUrl })
          .eq("report_id", reportId);

        if (updateError)
          console.warn("Could not update image_url", updateError);
      }

      setSuccess("Report submitted successfully.");

      // reset form
      setTitle("");
      setCategory("");
      setDateOfIncident("");
      setTimeOfIncident("");
      setLocation("");
      setDetails("");
      setFiles([]);

      // optionally navigate to reports list or the created report page
      // navigate(`/student/reports/${reportId}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavforSRF />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6">Report Details</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Incident Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder=""
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Incident Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Incident Date
                </label>
                <input
                  type="date"
                  value={dateOfIncident}
                  onChange={(e) => setDateOfIncident(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Incident Time
                </label>
                <input
                  type="time"
                  value={timeOfIncident}
                  onChange={(e) => setTimeOfIncident(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Incident Location
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Stay Anonymous ?
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="anonymous"
                    checked={isAnonymous}
                    onChange={() => setIsAnonymous(true)}
                  />
                  <span>Anonymous</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="anonymous"
                    checked={!isAnonymous}
                    onChange={() => setIsAnonymous(false)}
                  />
                  <span>Show name</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Incident Image(s)
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFilesChange}
                className="w-full"
              />

              {files.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  Selected: {files.map((f) => f.name).join(", ")}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Incident Details
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={8}
                className="w-full border p-2 rounded"
                placeholder="Enter your question or message"
              />
            </div>

            <div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">{success}</p>}

              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full md:w-1/2 bg-blue-600 text-white py-2 rounded shadow"
              >
                {loading ? "Submitting..." : "SUBMIT"}
              </button>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default StudentIncidentReport;
