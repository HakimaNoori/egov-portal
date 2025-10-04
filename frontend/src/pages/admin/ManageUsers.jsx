// src/pages/admin/ManageUsers.jsx
import { useState, useEffect } from "react";
import axios from "axios";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ search: "", role: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users", { params: filters });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      setMessage("User deleted.");
    } catch (error) {
      setMessage("Error deleting user.");
    }
  };

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Users</h1>
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          name="search"
          placeholder="Search by Name or ID"
          onChange={handleFilterChange}
          className="p-2 border rounded focus:outline-none focus:border-blue-600"
        />
        <select
          name="role"
          onChange={handleFilterChange}
          className="p-2 border rounded focus:outline-none focus:border-blue-600"
        >
          <option value="">All Roles</option>
          <option value="citizen">Citizen</option>
          <option value="officer">Officer</option>
          <option value="admin">Admin</option>
        </select>
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
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Department/Info</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-3">{user.id}</td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">{user.department || user.nationalId}</td>
              <td className="p-3">
                <button
                  onClick={() => handleDelete(user.id)}
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

export default ManageUsers;
