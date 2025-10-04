// src/pages/admin/ManageDepartments.jsx
import { useState, useEffect } from "react";
import axios from "axios";

function ManageDepartments() {
  const [departments, setDepartments] = useState([]);
  const [newDept, setNewDept] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("/api/departments");
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleAdd = async () => {
    try {
      const response = await axios.post("/api/departments", { name: newDept });
      setDepartments([...departments, response.data]);
      setNewDept("");
      setMessage("Department added.");
    } catch (error) {
      setMessage("Error adding department.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/departments/${id}`);
      setDepartments(departments.filter((dept) => dept.id !== id));
      setMessage("Department deleted.");
    } catch (error) {
      setMessage("Error deleting department.");
    }
  };

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Manage Departments
      </h1>
      <div className="mb-6">
        <input
          type="text"
          value={newDept}
          onChange={(e) => setNewDept(e.target.value)}
          placeholder="New Department Name"
          className="p-2 border rounded mr-2 focus:outline-none focus:border-blue-600"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Department
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
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id} className="border-t">
              <td className="p-3">{dept.id}</td>
              <td className="p-3">{dept.name}</td>
              <td className="p-3">
                <button
                  onClick={() => handleDelete(dept.id)}
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

export default ManageDepartments;
