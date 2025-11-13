export default function MyReports() {
  return (
    <div className="max-w-7xl mx-auto mt-10 px-6">
      <h2 className="text-2xl font-bold mb-8">Your Report List</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left text-gray-600">
            <th className="py-3">ID</th>
            <th className="py-3">Title</th>
            <th className="py-3">Status</th>
            <th className="py-3">Anonymity</th>
            <th className="py-3">Details</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td colSpan={5} className="py-6 text-center text-gray-400">
              {/* intentionally empty — no sample data */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
