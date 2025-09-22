// src/pages/citizen/RequestStatus.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function RequestStatus() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-center py-6">Loading...</p>;
  console.log(request);
  if (!request)
    return <p className="text-center py-6 text-red-600">Request not found.</p>;

  return (
    <div className="py-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Request Status: {request.service}
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="mb-4">
          <strong>Request ID:</strong> {request.id}
        </p>
        <p className="mb-4">
          <strong>Status:</strong>
          <span
            className={`font-bold ml-1 ${
              request.status === "Approved"
                ? "text-green-600"
                : request.status === "Rejected"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {request.status}
          </span>
        </p>
        <p className="mb-4">
          <strong>Date Submitted:</strong> {request.date}
        </p>
        <p className="mb-4">
          <strong>Department:</strong> {request.department}
        </p>
        <p className="mb-4">
          <strong>Details:</strong> {request.details}
        </p>

        {request.documents && request.documents.length > 0 ? (
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
          <p>No documents uploaded.</p>
        )}
      </div>
    </div>
  );
}

export default RequestStatus;
