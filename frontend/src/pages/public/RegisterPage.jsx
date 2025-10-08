import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/services/authApiSlice";
import { setCredentials } from "../../redux/services/authSlice";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "citizen", // default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData).unwrap();

      dispatch(
        setCredentials({ user: response.user, token: response.accessToken })
      );
      toast.success("Registration successful ✅");

      // reset form
      setFormData({ name: "", email: "", password: "", role: "citizen" });
      navigate("/citizen/dashboard");
    } catch (err) {
      toast.error(err?.data?.message || "Registration failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Register as a Citizen
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Enter your full name"
          />
        </div>

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
          {isLoading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}
