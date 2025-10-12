import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/services/authApiSlice";
import { setCredentials } from "../../redux/services/authSlice";
import { toast } from "react-toastify";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData).unwrap();
      dispatch(setCredentials({ user: response.user, token: response.token }));

      toast.success(`Welcome back, ${response.user.name}!`);

      // Redirect based on role
      const role = response.user.role;
      if (role === "citizen") navigate("/citizen/services");
      else if (role === "officer") navigate("/officer/requests");
      else if (role === "dhead") navigate("/dhead/requests");
      else if (role === "admin") navigate("/admin/analysis");
      else navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Login to E-Gov Portal
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
