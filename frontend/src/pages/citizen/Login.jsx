// src/pages/citizen/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CitizenLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login/citizen", formData);
      // Save token or session
      navigate("/citizen/dashboard");
    } catch (error) {
      setMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="py-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Citizen Login
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Email or National ID
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-600"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-600"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-semibold w-full"
        >
          Login
        </button>
        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <a href="/citizen/register" className="text-blue-600 hover:underline">
          Register here
        </a>
        .
      </p>{" "}
      {/* Assume register page exists */}
    </div>
  );
}

export default CitizenLogin;
