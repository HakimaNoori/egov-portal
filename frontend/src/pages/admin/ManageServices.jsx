// src/pages/admin/ManageServices.jsx
import { useState, useEffect } from "react";
import axios from "axios";

function ManageServices() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: "", departmentId: "" });
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, deptsRes] = await Promise.all([
          axios.get("/api/services"),
          axios.get("/api/departments"),
        ]);
        setServices(servicesRes.data);
        setDepartments(deptsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post("/api/services", newService);
      setServices([...services, response.data]);
      setNewService({ name: "", departmentId: "" });
      setMessage("Service added.");
    } catch (error) {
      setMessage("Error adding service.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/services/${id}`);
      setServices(services.filter((service) => service.id !== id));
      setMessage("Service deleted.");
    } catch (error) {
      setMessage("Error deleting service.");
    }
  };

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Services</h1>
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          name="name"
          value={newService.name}
          onChange={handleInputChange}
          placeholder="Service Name"
          className="p-2 border rounded focus:outline-none focus:border-blue-600"
        />
        <select
          name="departmentId"
          value={newService.departmentId}
          onChange={handleInputChange}
          className="p-2 border rounded focus:outline-none focus:border-blue-600"
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Service
        </button>
      </div>
      {message && (
        <p
          className={`mb-4 text-center ${
            message.includes("Error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Department</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} className="border-t">
              <td className="p-3">{service.id}</td>
              <td className="p-3">{service.name}</td>
              <td className="p-3">{service.departmentName}</td>
              <td className="p-3">
                <button
                  onClick={() => handleDelete(service.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageServices;
