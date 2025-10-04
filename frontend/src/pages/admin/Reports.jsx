import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Reports() {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Fetch report data from backend
    const fetchReports = async () => {
      try {
        const response = await axios.get("/api/reports");
        setReportData(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
  }, []);

  const chartData = {
    labels: ["Interior", "Commerce", "Housing"],
    datasets: [
      {
        label: "Requests",
        data: reportData
          ? [reportData.interior, reportData.commerce, reportData.housing]
          : [0, 0, 0],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold mb-6">Admin Reports</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Request Statistics</h2>
        <div className="mb-6">
          <Bar data={chartData} options={{ responsive: true }} />
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Department</th>
              <th className="border p-2">Total Requests</th>
              <th className="border p-2">Approved</th>
              <th className="border p-2">Rejected</th>
              <th className="border p-2">Fees Collected</th>
            </tr>
          </thead>
          <tbody>
            {reportData && (
              <>
                <tr>
                  <td className="border p-2">Interior</td>
                  <td className="border p-2">{reportData.interior}</td>
                  <td className="border p-2">{reportData.interiorApproved}</td>
                  <td className="border p-2">{reportData.interiorRejected}</td>
                  <td className="border p-2">${reportData.interiorFees}</td>
                </tr>
                {/* Add rows for other departments */}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;
