// src/pages/officer/RequestDetail.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function RequestDetail() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await axios.get(`/api/requests/${id}`);
        setRequest(response.data);
      } catch (error) {
        console.error("Error fetching request:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id]);

  const handleApprove = async () => {
    try {
      await axios.put(`/api/requests/${id}/approve`, { comment });
      setMessage("Request approved successfully.");
    } catch (error) {
      setMessage("Error approving request.");
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(`/api/requests/${id}/reject`, { comment });
      setMessage("Request rejected successfully.");
    } catch (error) {
      setMessage("Error rejecting request.");
    }
  };

  if (loading) return <p className="text-center py-6">Loading...</p>;
  if (!request)
    return <p className="text-center py-6 text-red-600">Request not found.</p>;

  return (
    <div className="py-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Request Detail: {request.service}
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <p className="mb-4">
          <strong>Request ID:</strong> {request.id}
        </p>
        <p className="mb-4">
          <strong>Citizen Name:</strong> {request.citizenName}
        </p>
        <p className="mb-4">
          <strong>Status:</strong> {request.status}
        </p>
        <p className="mb-4">
          <strong>Date Submitted:</strong> {request.date}
        </p>
        <p className="mb-4">
          <strong>Details:</strong> {request.details}
        </p>
        <h2 className="text-xl font-semibold mb-2">Documents</h2>
        {request.documents.length > 0 ? (
          <ul className="list-disc pl-5">
            {request.documents.map((doc, index) => (
              <li key={index}>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {doc.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No documents.</p>
        )}
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Approve or Reject</h2>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add comments (optional)"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:border-blue-600"
          rows="3"
        />
        <div className="flex space-x-4">
          <button
            onClick={handleApprove}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 font-semibold"
          >
            Approve
          </button>
          <button
            onClick={handleReject}
            className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 font-semibold"
          >
            Reject
          </button>
        </div>
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("Error") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default RequestDetail;
