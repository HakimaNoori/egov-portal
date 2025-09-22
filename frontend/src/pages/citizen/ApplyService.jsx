import { useState } from "react";
import axios from "axios";

function ApplyService() {
  const [formData, setFormData] = useState({
    department: "",
    service: "",
    details: "",
  });
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("department", formData.department);
    data.append("service", formData.service);
    data.append("details", formData.details);
    for (let i = 0; i < files.length; i++) {
      data.append("documents", files[i]);
    }

    try {
      // Replace with your backend API endpoint
      await axios.post("/api/requests", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(
        "Application submitted successfully! Redirecting to payment..."
      );
      setTimeout(() => {
        // Simulate payment success page
        window.location.href = "/citizen/payment-success";
      }, 2000);
    } catch (error) {
      setMessage("Error submitting application.");
    }
  };

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold mb-6">Apply for a Service</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Department</option>
            <option value="interior">Interior</option>
            <option value="commerce">Commerce</option>
            <option value="housing">Housing</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Service
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Service</option>
            <option value="passport-renewal">Passport Renewal</option>
            <option value="business-license">Business License</option>
            <option value="land-registration">Land Registration</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Details
          </label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Upload Documents (PDF/JPG)
          </label>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Application
        </button>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </form>
    </div>
  );
}

export default ApplyService;
