import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { type IncidentReport } from '../types';
import Navbar from '../components/NavbarForAdmin';
import Footer from '../components/Footer';

const CATEGORIES = [
  "Bullying or harassment",
  "Sexual harassment or misconduct",
  "Academic dishonesty or plagiarism",
  "Copyright infringement",
  "Cybercrime or digital misuse",
  "Property damage or vandalism",
  "Drug possession or use",
  "Fraud, deception, or theft",
  "Eve teasing or ragging",
  "Violence, abuse, or possession of weapons"
];

const AdminDashboard = () => {
  const [reports, setReports] = useState<IncidentReport[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const [stats, setStats] = useState({ total: 0, unresolved: 0, investigating: 0, resolved: 0 });

  const [expandedReportIds, setExpandedReportIds] = useState<Set<number>>(new Set());

  const fetchData = async () => {
    setLoading(true);
    
    let query = supabase
      .from('incident_reports')
      .select(`
        *,
        users (full_name, student_id),
        attachments (file_url, file_type)
      `)
      .order('created_at', { ascending: false }); 

    if (categoryFilter) query = query.eq('category', categoryFilter);
    if (statusFilter) query = query.eq('status', statusFilter === 'Unresolved' ? 'New' : statusFilter);

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching reports:', error);
    } else {
      setReports(data as unknown as IncidentReport[]);
    }

    const { data: allReports } = await supabase.from('incident_reports').select('status');
    
    if (allReports) {
      const statsCount = {
        total: allReports.length,
        unresolved: allReports.filter(r => r.status === 'New').length, // Assuming 'New' = Unresolved
        investigating: allReports.filter(r => r.status === 'Investigating').length,
        resolved: allReports.filter(r => r.status === 'Resolved').length,
      };
      setStats(statsCount);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [categoryFilter, statusFilter]);


  const handleStatusChange = async (reportId: number, newStatus: string) => {
    const { error } = await supabase
      .from('incident_reports')
      .update({ status: newStatus === 'Unresolved' ? 'New' : newStatus }) // Handle mapping
      .eq('report_id', reportId);

    if (error) {
      alert("Failed to update status");
    } else {
      fetchData();
    }
  };

  const toggleExpand = (id: number) => {
    const newSet = new Set(expandedReportIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedReportIds(newSet);
  };

  const handleRefresh = () => {
    setCategoryFilter('');
    setStatusFilter('');
    fetchData();
  };

  const getWordCount = (text: string) => text.trim().split(/\s+/).length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 py-8">
        
        {/* --- STATS CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Reports" count={stats.total} />
          <StatCard title="Unresolved" count={stats.unresolved} />
          <StatCard title="Investigating" count={stats.investigating} />
          <StatCard title="Resolved" count={stats.resolved} />
        </div>

        {/* --- FILTERS --- */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4 w-full md:w-auto">
            {/* Category Dropdown */}
            <select 
              className="border p-2 rounded-md bg-gray-100 w-full md:w-64"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            {/* Status Dropdown */}
            <select 
              className="border p-2 rounded-md bg-gray-100 w-full md:w-48"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="New">Unresolved</option>
              <option value="Investigating">Investigating</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <button 
            onClick={handleRefresh}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition"
          >
            Refresh
          </button>
        </div>

        {/* --- REPORTS LIST --- */}
        <div className="space-y-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading reports...</p>
          ) : reports.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-xl text-gray-500">No report available</p>
            </div>
          ) : (
            reports.map((report) => {
              const isExpanded = expandedReportIds.has(report.report_id);
              const wordCount = getWordCount(report.description);
              const isLong = wordCount > 20;
              const hasImages = report.attachments && report.attachments.length > 0;
              
              // Formatting the description
              const displayedText = (isLong && !isExpanded)
                ? report.description.split(/\s+/).slice(0, 20).join(" ") + "..."
                : report.description;

              return (
                <div key={report.report_id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">
                        {report.is_anonymous ? "Anonymous User" : report.users?.full_name || "Unknown User"}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {new Date(report.created_at).toLocaleDateString()} • {report.category}
                      </p>
                    </div>
                    
                    {/* Status Changer for Admin */}
                    <select 
                      value={report.status === 'New' ? 'Unresolved' : report.status}
                      onChange={(e) => handleStatusChange(report.report_id, e.target.value)}
                      className={`text-sm px-3 py-1 rounded-full border cursor-pointer font-medium
                        ${report.status === 'Resolved' ? 'bg-green-100 text-green-700 border-green-200' : 
                          report.status === 'Investigating' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 
                          'bg-red-100 text-red-700 border-red-200'}`}
                    >
                      <option value="Unresolved">Unresolved</option>
                      <option value="Investigating">Investigating</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>

                  <p className="text-gray-700 mb-4 whitespace-pre-wrap">{displayedText}</p>

                  {/* Images Section (Only visible if expanded) */}
                  {isExpanded && hasImages && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                      {report.attachments.map((att, idx) => (
                        <a key={idx} href={att.file_url} target="_blank" rel="noopener noreferrer">
                          <img 
                            src={att.file_url} 
                            alt="Evidence" 
                            className="w-full h-32 object-cover rounded-lg border hover:opacity-90 transition"
                          />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* View Details Button Logic */}
                  {(isLong || hasImages) && (
                    <button 
                      onClick={() => toggleExpand(report.report_id)}
                      className="mt-2 text-sm font-semibold bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md transition"
                    >
                      {isExpanded ? "Show Less" : "View Details"}
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Simple Sub-component for the top cards
const StatCard = ({ title, count }: { title: string, count: number }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col justify-center h-32">
    <h3 className="text-gray-500 font-medium text-sm mb-1">{title}</h3>
    <p className="text-4xl font-bold text-gray-800">{count}</p>
  </div>
);

export default AdminDashboard;