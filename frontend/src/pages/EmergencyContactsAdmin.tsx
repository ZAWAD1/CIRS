import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { type EmergencyContactAdmin, type ContactType } from '../types';
import Footer from '../components/Footer';

const CONTACT_TYPES: ContactType[] = ['Security', 'Counseling', 'Admin', 'Medical'];

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState<EmergencyContactAdmin[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const [formData, setFormData] = useState<Partial<EmergencyContactAdmin>>({
    name: '',
    phone: '',
    email: '',
    type: 'Security' 
  });

  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('emergency_contacts')
      .select('*')
      .order('contact_id', { ascending: true });

    if (error) {
      console.error('Error fetching contacts:', error);
    } else if (data) {
      setContacts(data as EmergencyContactAdmin[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const validateForm = (): boolean => {
    const safeName = formData.name || '';
    const safePhone = formData.phone || '';
    const safeEmail = formData.email || '';

    if (/\d/.test(safeName)) {
      alert("Validation Error: Name cannot contain numbers.");
      return false;
    }
    if (!/^\d+$/.test(safePhone)) {
      alert("Validation Error: Contact Number must be a valid integer.");
      return false;
    }
    if (!safeEmail || !safeEmail.includes('@')) {
      alert("Validation Error: Please enter a valid email.");
      return false;
    }
    return true;
  };

  const handleAddNewClick = () => {
    setFormData({ name: '', phone: '', email: '', type: 'Security' });
    setIsAdding(true);
    setEditingId(null);
  };

  const handleEditClick = (contact: EmergencyContactAdmin) => {
    setFormData(contact);
    setEditingId(contact.contact_id);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const contactPayload = {
        name: formData.name || '',
        phone: formData.phone || '',
        email: formData.email || '',
        type: (formData.type || 'Security') as ContactType
      };

      if (isAdding) {
        const { error } = await supabase
          .from('emergency_contacts')
          .insert([contactPayload]);
        
        if (error) throw error;
      } else if (editingId) {
        const { error } = await supabase
          .from('emergency_contacts')
          .update(contactPayload)
          .eq('contact_id', editingId);

        if (error) throw error;
      }

      setIsAdding(false);
      setEditingId(null);
      fetchContacts(); 

    } catch (err: any) {
      if (err.message && err.message.includes('unique constraint')) {
        alert("Error: This email already exists.");
      } else {
        console.error(err);
        alert("Failed to save.");
      }
    }
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Are you sure you want to delete this contact?");
    if (!confirm) return;

    const { error } = await supabase
      .from('emergency_contacts')
      .delete()
      .eq('contact_id', id);

    if (error) console.error(error);
    else fetchContacts();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <div className="flex justify-between items-center p-6 bg-white border-b">
        <div className="flex items-center gap-2">
           <img src="/Ulab-logo.png" alt="ULAB Logo" className="h-12" />
        </div>
        <div className="flex gap-4">
          <Link to="/admin/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
          <Link to="/" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">Logout</Link>
        </div>
      </div>

      <div className="flex-grow container mx-auto px-6 py-4">
        <h1 className="text-2xl font-bold mb-6">Emergency contacts</h1>

        {!isAdding && (
          <button onClick={handleAddNewClick} className="mb-6 px-4 py-1.5 border border-gray-400 rounded-full text-sm font-medium hover:bg-gray-100">
            Add new
          </button>
        )}

        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Contact Number</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              
              {isAdding && (
                <tr className="bg-white">
                  <td className="p-4"><input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border p-2 rounded w-full" /></td>
                  <td className="p-4"><input name="phone" placeholder="Digits only" value={formData.phone} onChange={handleChange} className="border p-2 rounded w-full" /></td>
                  <td className="p-4"><input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 rounded w-full" /></td>
                  <td className="p-4">
                    <select name="type" value={formData.type} onChange={handleChange} className="border p-2 rounded w-full">
                      {CONTACT_TYPES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </td>
                  <td className="p-4 flex gap-2 justify-center">
                    <button onClick={handleSave} className="px-3 py-1 bg-green-500 text-white rounded text-sm">Save</button>
                    <button onClick={handleCancel} className="px-3 py-1 bg-gray-400 text-white rounded text-sm">Cancel</button>
                  </td>
                </tr>
              )}

              {loading ? (
                 <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading...</td></tr>
              ) : contacts.length === 0 && !isAdding ? (
                 <tr><td colSpan={5} className="p-8 text-center text-gray-500 text-lg">No Contact Information</td></tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact.contact_id} className="bg-white hover:bg-gray-50">
                    {editingId === contact.contact_id ? (
                      <>
                        <td className="p-4"><input name="name" value={formData.name} onChange={handleChange} className="border p-1 rounded w-full" /></td>
                        <td className="p-4"><input name="phone" value={formData.phone} onChange={handleChange} className="border p-1 rounded w-full" /></td>
                        <td className="p-4"><input name="email" value={formData.email} onChange={handleChange} className="border p-1 rounded w-full" /></td>
                        <td className="p-4">
                          <select name="type" value={formData.type} onChange={handleChange} className="border p-1 rounded w-full">
                            {CONTACT_TYPES.map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                        </td>
                        <td className="p-4 flex gap-2 justify-center">
                          <button onClick={handleSave} className="px-3 py-1 bg-green-500 text-white rounded text-sm">Save</button>
                          <button onClick={handleCancel} className="px-3 py-1 bg-gray-400 text-white rounded text-sm">Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-4 text-gray-800">{contact.name}</td>
                        <td className="p-4 text-gray-800">{contact.phone}</td>
                        <td className="p-4 text-gray-800">{contact.email}</td>
                        <td className="p-4 text-gray-800">{contact.type}</td>
                        <td className="p-4 flex gap-2 justify-center">
                          <button onClick={() => handleEditClick(contact)} className="px-4 py-1 border border-gray-400 rounded-full text-sm hover:bg-gray-100">Edit</button>
                          <button onClick={() => handleDelete(contact.contact_id)} className="px-4 py-1 border border-gray-400 rounded-full text-sm hover:bg-red-50 text-red-600">Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}