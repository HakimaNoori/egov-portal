import { Link } from "react-router-dom";
import { CheckCircle, XCircle, Clock } from "lucide-react"; // آیکن‌ها

function RequestCard({ request }) {
  const statusColor =
    request.status === "Approved"
      ? "text-green-600"
      : request.status === "Rejected"
      ? "text-red-600"
      : "text-yellow-600";

  const statusIcon =
    request.status === "Approved" ? (
      <CheckCircle className="w-5 h-5 mr-1 text-green-600" />
    ) : request.status === "Rejected" ? (
      <XCircle className="w-5 h-5 mr-1 text-red-600" />
    ) : (
      <Clock className="w-5 h-5 mr-1 text-yellow-600" />
    );

  return (
    <div className="bg-gradient-to-r from-gray-50 to-white shadow-md rounded-2xl p-5 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">
          {request.service}
        </h3>
        <span className="text-sm text-gray-400">
          {new Date(request.date).toLocaleDateString()}
        </span>
      </div>

      <div className="mt-3 flex items-center">
        {statusIcon}
        <p className={`font-bold ${statusColor}`}>{request.status}</p>
      </div>

      <div className="mt-4 flex justify-end">
        <Link
          to={`/citizen/requests/${request.id}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default RequestCard;
