import { useState } from "react";

export default function IncidentForm() {
  const [anonymous, setAnonymous] = useState("anonymous");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    details: "",
    image: null as File | null,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.date) {
      alert("Please fill all required fields.");
      return;
    }
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-6">
      <h2 className="text-xl font-semibold mb-6">Report Details</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium">Incident Title</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded mt-1"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Incident Category</label>
            <select
              className="w-full border px-3 py-2 rounded mt-1"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Select a category</option>
              <option>Harassment</option>
              <option>Safety Issue</option>
              <option>Property Damage</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Incident Date</label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded mt-1"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Incident Time</label>
            <input
              type="time"
              className="w-full border px-3 py-2 rounded mt-1"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Incident Location</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded mt-1"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium">Stay Anonymous ?</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="anonymous"
                  checked={anonymous === "anonymous"}
                  onChange={() => setAnonymous("anonymous")}
                />
                Anonymous
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="show"
                  checked={anonymous === "show"}
                  onChange={() => setAnonymous("show")}
                />
                Show name
              </label>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Incident Image</label>
            <input
              type="file"
              className="w-full border px-3 py-2 rounded mt-1"
              onChange={(e: any) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium">Incident Details</label>
            <textarea
              rows={6}
              placeholder="Enter your question or message"
              className="w-full border px-3 py-2 rounded mt-1"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            ></textarea>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="col-span-2 flex justify-center mt-4">
          <button className="bg-blue-600 text-white text-sm px-28 py-2 rounded hover:bg-blue-700 transition-all">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}
