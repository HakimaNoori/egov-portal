import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../redux/services/authApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/services/authSlice";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "citizen",
  });

  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData).unwrap();

      dispatch(setCredentials({ user: response.user, token: response.accessToken }));

      toast.success("Registration successful ✅");
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "citizen",
      });
    } catch (err) {
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="border p-2 w-full"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          className="border p-2 w-full"
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="border p-2 w-full"
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
