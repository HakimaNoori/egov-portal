import { useState, useEffect } from "react";
import axios from "axios";
import RequestCard from "../../components/RequestCard.jsx";

function OfficerDashboard() {
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    requestId: "",
    status: "",
    serviceType: "",
    dateRange: "",
  });

  useEffect(() => {
    // Fetch requests from backend
    const fetchRequests = async () => {
      try {
        const response = await axios.get("/api/requests", { params: filters });
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold mb-6">Officer Dashboard</h1>
      <div className="mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="requestId"
          placeholder="Request ID"
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <select
          name="status"
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Statuses</option>
          <option value="Submitted">Submitted</option>
          <option value="Under Review">Under Review</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="date"
          name="dateRange"
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {requests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
    </div>
  );
}

export default OfficerDashboard;
