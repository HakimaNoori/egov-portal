import { Link } from "react-router-dom";
import RequestCard from "../../components/RequestCard";

function CitizenDashboard() {
  // Mock data (replace with API call)
  const requests = [
    {
      id: 1,
      service: "Passport Renewal",
      status: "Under Review",
      date: "2025-08-20",
    },
    {
      id: 2,
      service: "National ID Update",
      status: "Approved",
      date: "2025-08-15",
    },
  ];

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold mb-6">Citizen Dashboard</h1>
      <Link to="/citizen/apply">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6">
          Apply for a New Service
        </button>
      </Link>
      <h2 className="text-2xl font-semibold mb-4">Your Requests</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {requests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
    </div>
  );
}

export default CitizenDashboard;
