import { useState } from "react";
import { useParams } from "react-router-dom";
import { useListRequestsQuery, useUpdateRequestMutation, useGetDocumentsQuery } from "../../redux/services/requestApiSlice";
import RequestStatusBadge from "../../components/requests/RequestStatusBadge";
import RequestDocumentModal from "../../components/requests/RequestDocumentModal";

export default function DheadRequestDetails() {
  const { id } = useParams();
  const { data: requests = [] } = useListRequestsQuery();
  const request = requests.find((r) => String(r.id) === String(id));
  const { data: documents = [] } = useGetDocumentsQuery(Number(id));
  const [updateRequest, { isLoading: updating }] = useUpdateRequestMutation();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewType, setPreviewType] = useState(null);

  if (!request) return <div className="p-6">Request not found.</div>;

  const handleDecision = async (decision) => {
    if (!confirm(`Are you sure you want to ${decision} this request?`)) return;
    try {
      await updateRequest({ id: request.id, status: decision }).unwrap();
      alert(`Request ${decision}`);
    } catch (err) {
      alert(err?.data?.message || err.message || "Failed");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <section className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-2">{request.Service?.name ?? "Service"}</h2>
        <div className="text-sm text-gray-600 mb-2">Applicant: {request.applicant?.name ?? request.applicant_id}</div>
        <div className="text-sm">Status: <RequestStatusBadge status={request.status} /></div>
      </section>

      <section className="bg-white p-6 rounded-2xl shadow-sm">
        <h3 className="font-semibold mb-3">Documents</h3>
        {documents.length === 0 ? <div className="text-gray-500">No documents</div> : (
          <div className="space-y-2">
            {documents.map(d => (
              <div key={d.id} className="flex items-center justify-between border p-2 rounded-lg">
                <div>
                  <div className="font-medium">File #{d.id}</div>
                  <div className="text-sm text-gray-500">{d.file_type}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setPreviewUrl(d.file_path); setPreviewType(d.file_type); }} className="px-3 py-1 border rounded-lg">View</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="flex gap-2">
        <button onClick={() => handleDecision("approved")} disabled={updating} className="px-4 py-2 bg-green-600 text-white rounded-lg">Approve</button>
        <button onClick={() => handleDecision("rejected")} disabled={updating} className="px-4 py-2 bg-red-600 text-white rounded-lg">Reject</button>
      </div>

      {previewUrl && <RequestDocumentModal fileUrl={previewUrl} fileType={previewType} onClose={() => { setPreviewUrl(null); setPreviewType(null); }} />}
    </div>
  );
}
