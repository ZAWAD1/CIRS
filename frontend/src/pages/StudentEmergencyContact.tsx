import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Footer from "../components/Footer";
import NavforEC from "../components/NavforEC";

interface EmergencyContact {
  contact_id: number;
  name: string;
  phone: string;
  email: string;
  type: string;
}

const StudentEmergencyContact = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("emergency_contacts")
        .select("contact_id, name, phone, email, type")
        .order("contact_id", { ascending: true });

      if (error) console.error("Error fetching contacts:", error);
      else setContacts(data || []);

      setLoading(false);
    };

    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavforEC />

      <main className="flex-grow px-8 py-10">
        <h1 className="text-3xl font-semibold mb-6">Emergency Contacts</h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : contacts.length === 0 ? (
          <p className="text-gray-500">No emergency contacts found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-left text-gray-700">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Contact Number</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Type</th>
                </tr>
              </thead>

              <tbody>
                {contacts.map((c) => (
                  <tr key={c.contact_id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{c.name}</td>
                    <td className="px-4 py-2 border">{c.phone}</td>
                    <td className="px-4 py-2 border">{c.email}</td>
                    <td className="px-4 py-2 border capitalize">{c.type}</td>
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

export default StudentEmergencyContact;
