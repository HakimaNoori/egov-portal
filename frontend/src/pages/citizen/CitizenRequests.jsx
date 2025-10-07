import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMyRequestsQuery, useCreateRequestMutation } from "../../redux/services/requestApiSlice";
import { useListServicesQuery } from "../../redux/services/serviceApiSlice";
import RequestStatusBadge from "../../components/requests/RequestStatusBadge";

export default function CitizenRequests() {
  const { data: requests = [], isLoading, isError } = useMyRequestsQuery();
  const { data: services = [], isLoading: servicesLoading } = useListServicesQuery();
  const [createRequest, { isLoading: creating }] = useCreateRequestMutation();
  const [showCreate, setShowCreate] = useState(false);
  const [serviceId, setServiceId] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!serviceId) return alert("Select a service");
    try {
      await createRequest({ service_id: Number(serviceId) }).unwrap();
      setServiceId("");
      setShowCreate(false);
    } catch (err) {
      alert(err?.data?.message || err.message || "Create failed");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">My Requests</h2>
        <button onClick={() => setShowCreate(true)} className="px-4 py-2 bg-green-600 text-white rounded-lg">New Request</button>
      </section>

      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div className="text-red-600">Failed to load requests</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-3 py-2 text-left">#</th>
                  <th className="px-3 py-2 text-left">Service</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Created</th>
                  <th className="px-3 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2">{r.id}</td>
                    <td className="px-3 py-2">{r.Service?.name ?? "—"}</td>
                    <td className="px-3 py-2"><RequestStatusBadge status={r.status} /></td>
                    <td className="px-3 py-2">{new Date(r.created_at).toLocaleString()}</td>
                    <td className="px-3 py-2">
                      <Link to={`/citizen/requests/${r.id}`} className="px-3 py-1 border rounded-lg hover:bg-gray-100">View</Link>
                    </td>
                  </tr>
                ))}
                {requests.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-3 py-4 text-center text-gray-500">No requests yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create Request</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Service</label>
                <select required value={serviceId} onChange={(e) => setServiceId(e.target.value)} className="w-full p-2 border rounded-lg">
                  <option value="">Select Service</option>
                  {servicesLoading ? <option disabled>Loading...</option> : services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowCreate(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" disabled={creating} className="px-4 py-2 bg-green-600 text-white rounded-lg">{creating ? "Submitting..." : "Submit Request"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
