import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useListRequestsQuery,
  useUpdateRequestMutation,
  useGetDocumentsQuery,
} from "../../redux/services/requestApiSlice";
import RequestStatusBadge from "../../components/requests/RequestStatusBadge";

// ✅ Inline modal with loading indicator
function RequestDocumentModal({ fileUrl, fileType, onClose }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-2xl shadow-xl max-w-3xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 px-3 py-1 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          ✕
        </button>

        {/* Spinner while preview loads */}
        {isLoading && (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
          </div>
        )}

        {/* Image or document preview */}
        {fileType?.startsWith("image/") ? (
          <img
            src={fileUrl}
            alt="Document preview"
            onLoad={() => setIsLoading(false)}
            className={`max-h-[80vh] mx-auto transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        ) : (
          <iframe
            src={fileUrl}
            title="Document Preview"
            onLoad={() => setIsLoading(false)}
            className={`w-full h-[80vh] rounded-xl transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        )}
      </div>
    </div>
  );
}

export default function OfficerRequestDetails() {
  const { id } = useParams();
  const { data: requests = [] } = useListRequestsQuery();
  const request = requests.find((r) => String(r.id) === String(id));

  const { data: documents = [], isLoading: docsLoading } =
    useGetDocumentsQuery(Number(id));

  const [updateRequest, { isLoading: updating }] = useUpdateRequestMutation();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewType, setPreviewType] = useState(null);
  const [reviewed, setReviewed] = useState(false);

  if (!request)
    return (
      <div className="p-6">
        <div className="bg-white p-6 rounded-2xl">Request not found.</div>
      </div>
    );

  const handleMarkReviewed = async () => {
    if (!confirm("Mark this request as reviewed?")) return;
    try {
      await updateRequest({ id: request.id, status: "reviewed" }).unwrap();
      setReviewed(true);
    } catch (err) {
      alert(err?.data?.message || err.message || "Failed");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Request Info */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">
          {request.Service?.name ?? "Service"}
        </h2>
        <div className="text-sm text-gray-600 mb-2">
          Applicant: {request.applicant?.name ?? request.applicant_id}
        </div>
        <div className="text-sm">
          Status: <RequestStatusBadge status={request.status} />
        </div>
      </section>

      {/* Documents */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="font-semibold mb-3">Documents</h3>

        {docsLoading ? (
          <div>Loading documents...</div>
        ) : documents.length === 0 ? (
          <div className="text-gray-500">No documents</div>
        ) : (
          <div className="space-y-2">
            {documents.map((d) => (
              <div
                key={d.id}
                className="flex items-center justify-between border p-2 rounded-lg"
              >
                <div>
                  <div className="font-medium">File #{d.id}</div>
                  <div className="text-sm text-gray-500">{d.file_type}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setPreviewUrl(d.file_path);
                      setPreviewType(d.file_type);
                    }}
                    className="px-3 py-1 border rounded-lg hover:bg-gray-50"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Review Button */}
      <div className="flex gap-2">
        <button
          onClick={handleMarkReviewed}
          disabled={updating || request.status === "reviewed" || reviewed}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          {updating
            ? "Saving..."
            : request.status === "reviewed" || reviewed
            ? "Reviewed"
            : "Mark Reviewed"}
        </button>
      </div>

      {/* Document Preview Modal */}
      {previewUrl && (
        <RequestDocumentModal
          fileUrl={previewUrl}
          fileType={previewType}
          onClose={() => {
            setPreviewUrl(null);
            setPreviewType(null);
          }}
        />
      )}
    </div>
  );
}
