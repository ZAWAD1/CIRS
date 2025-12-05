import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { supabase } from "../supabaseClient";
import Footer from "../components/Footer";
import NavforIRF from "../components/NavforIRF";



// -------- TYPE FOR FORM DATA --------
interface FormDataType {
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  details: string;
  image: File | null;
}

export default function IncidentFormPage() {
  const [anonymous, setAnonymous] = useState<"anonymous" | "show">("anonymous");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    details: "",
    image: null,
  });

  // -------- HANDLE FILE UPLOAD --------
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
  };

  // -------- FORM SUBMIT + SUPABASE INSERT --------
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    let image_url = null;

    // -------------------- IMAGE UPLOAD --------------------
    if (formData.image) {
      const fileExt = formData.image.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("incident_images") // bucket name
        .upload(fileName, formData.image);

      if (uploadError) {
        alert("Image upload failed!");
        console.log(uploadError);
      } else {
        const { data } = supabase.storage
          .from("incident_images")
          .getPublicUrl(fileName);

        image_url = data.publicUrl;
      }
    }

    // -------------------- INSERT INTO SUPABASE --------------------
    const { error } = await supabase.from("incident_reports").insert([
      {
        title: formData.title,
        category: formData.category,
        incident_date: formData.date,
        incident_time: formData.time,
        location: formData.location,
        details: formData.details,
        image_url: image_url,
        is_anonymous: anonymous === "anonymous",
        created_at: new Date(),
      },
    ]);

    setLoading(false);

    if (error) {
      console.log(error);
      alert("Something went wrong!");
      return;
    }

    alert("Incident Submitted Successfully ✔");

    // RESET FORM
    setFormData({
      title: "",
      category: "",
      date: "",
      time: "",
      location: "",
      details: "",
      image: null,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavforIRF/>

      {/* ---------------- FORM BODY ---------------- */}
      <div className="max-w-4xl mx-auto bg-white p-8 shadow mt-10 rounded">
        <h2 className="text-xl font-bold mb-6">Report Details</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {/* LEFT SIDE */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Incident Title</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
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
                required
              >
                <option value="">Select category *</option>

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
                  required
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
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Location</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
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
                onChange={handleFileChange}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Incident Details</label>
              <textarea
                rows={6}
                className="w-full border px-3 py-2 rounded"
                value={formData.details}
                onChange={(e) =>
                  setFormData({ ...formData, details: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-56 mx-auto block bg-blue-600 text-white py-2 rounded text-sm"
            >
              {loading ? "Submitting..." : "SUBMIT"}
            </button>
          </div>
        </form>
      </div>

      {/* ---------------- FOOTER ---------------- */}
<Footer/>
    </div>
  );
}
