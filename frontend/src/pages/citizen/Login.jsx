import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/services/authApiSlice";
import { setCredentials } from "../../redux/services/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CitizenLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData).unwrap();
      dispatch(setCredentials({ user: response.user, token: response.accessToken }));
      toast.success("Login successful ✅");
      navigate("/citizen/dashboard");
    } catch (err) {
      toast.error(err?.data?.message || "Invalid credentials. Please try again.");
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
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <a href="/citizen/register" className="text-blue-600 hover:underline">
          Register here
        </a>
        .
      </p>
    </div>
  );
}
