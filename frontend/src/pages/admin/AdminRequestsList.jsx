import { Link } from "react-router-dom";
import { useListRequestsQuery } from "../../redux/services/requestApiSlice";
import RequestStatusBadge from "../../components/requests/RequestStatusBadge";

export default function AdminRequestsList() {
  const { data: requests = [], isLoading, isError } = useListRequestsQuery();

  return (
    <div className="p-6">
      <section className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold">All Requests (Admin)</h2>
      </section>

      <section className="bg-white p-6 rounded-2xl shadow-sm mt-6">
        {isLoading ? <div>Loading...</div> : isError ? <div className="text-red-600">Failed to load requests</div> : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-3 py-2 text-left">#</th>
                  <th className="px-3 py-2 text-left">Applicant</th>
                  <th className="px-3 py-2 text-left">Service</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(r => (
                  <tr key={r.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2">{r.id}</td>
                    <td className="px-3 py-2">{r.applicant?.name ?? r.applicant_id}</td>
                    <td className="px-3 py-2">{r.Service?.name ?? "—"}</td>
                    <td className="px-3 py-2"><RequestStatusBadge status={r.status} /></td>
                    <td className="px-3 py-2"><Link to={`/admin/requests/${r.id}`} className="px-3 py-1 border rounded-lg hover:bg-gray-100">View</Link></td>
                  </tr>
                ))}
                {requests.length === 0 && <tr><td colSpan="5" className="px-3 py-4 text-center">No requests</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
