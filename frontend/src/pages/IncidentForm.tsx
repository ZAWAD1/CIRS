import React, { useState } from "react";
import { supabase } from "../supabaseClient";

type FormState = {
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  details: string;
  image: File | null;
};

export default function IncidentForm() {
  const [anonymous, setAnonymous] = useState<"anonymous" | "show">("anonymous");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormState>({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    details: "",
    image: null,
  });

  const bucketName = "incident-images";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.date) {
      alert("Please fill required fields (title, category, date).");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      let reporterId: number | null = null;

      if (user && anonymous === "show") {
        const { data: existingUser } = await supabase
          .from("users")
          .select("user_id")
          .eq("email", user.email)
          .maybeSingle();

        if (existingUser) {
          reporterId = existingUser.user_id;
        } else {
          const { data: newUser } = await supabase
            .from("users")
            .insert({
              full_name: user.user_metadata?.full_name || "Unnamed User",
              email: user.email,
              role: "student",
            })
            .select("user_id")
            .single();

          reporterId = newUser?.user_id || null;
        }
      }

      const { data: report, error: reportError } = await supabase
        .from("incident_reports")
        .insert({
          reporter_id: anonymous === "anonymous" ? null : reporterId,
          is_anonymous: anonymous === "anonymous",
          title: formData.title,
          category: formData.category,
          description: formData.details,
          date_of_incident: formData.date,
          time_of_incident: formData.time,
          location: formData.location,
          status: "New",
        })
        .select("report_id")
        .single();

      if (reportError || !report) {
        alert("❌ Failed to insert report");
        return;
      }

      const reportId = report.report_id;

      if (formData.image) {
        const ext = formData.image.name.split(".").pop();
        const fileName = `${reportId}_${Date.now()}.${ext}`;

        const upload = await supabase.storage
          .from(bucketName)
          .upload(fileName, formData.image);

        if (!upload.error) {
          const { data: url } = supabase.storage
            .from(bucketName)
            .getPublicUrl(fileName);

          await supabase.from("attachments").insert({
            report_id: reportId,
            file_url: url.publicUrl,
            file_type: formData.image.type,
          });
        }
      }

      alert("✔ Incident Submitted Successfully");

      setFormData({
        title: "",
        category: "",
        date: "",
        time: "",
        location: "",
        details: "",
        image: null,
      });

      setAnonymous("anonymous");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow px-8 py-8 rounded">
      <h2 className="text-xl font-bold mb-6">Report Details</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {/* LEFT */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Incident Title</label>
            <input
              type="text"
              placeholder="Incident Title *"
              className="w-full border px-3 py-2 rounded"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Incident Category</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="">Select category *</option>

              {/* Added Categories */}
              <option>Bullying or harassment</option>
              <option>Sexual harassment or misconduct</option>
              <option>Academic dishonesty or plagiarism</option>
              <option>Copyright infringement</option>
              <option>Cybercrime or digital misuse</option>
              <option>Property damage or vandalism</option>
              <option>Drug possession or use</option>
              <option>Fraud, deception, or theft</option>
              <option>Eve teasing or ragging</option>
              <option>Violence, abuse, or possession of weapons</option>

              {/* Old Options */}
              <option>Harassment</option>
              <option>Safety Issue</option>
              <option>Property Damage</option>
              <option>Other</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">Incident Date</label>
              <input
                type="date"
                className="w-full border px-3 py-2 rounded"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>

            <div className="w-40">
              <label className="block text-sm mb-1">Time</label>
              <input
                type="time"
                className="w-full border px-3 py-2 rounded"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Location</label>
            <input
              type="text"
              placeholder="Location"
              className="w-full border px-3 py-2 rounded"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <div>
            <p className="font-medium text-sm">Stay Anonymous?</p>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={anonymous === "anonymous"}
                  onChange={() => setAnonymous("anonymous")}
                />
                <span className="text-sm">Anonymous</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={anonymous === "show"}
                  onChange={() => setAnonymous("show")}
                />
                <span className="text-sm">Show Name</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: e.target.files?.[0] ?? null,
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Incident Details</label>
            <textarea
              rows={6}
              placeholder="Enter details..."
              className="w-full border px-3 py-2 rounded"
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
            />
          </div>
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-56 mx-auto block bg-blue-600 text-white py-2 rounded text-sm"
            disabled={loading}
          >
            {loading ? "Submitting..." : "SUBMIT"}
          </button>
        </div>
      </form>
    </div>
  );
}
