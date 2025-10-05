import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center px-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Welcome to the E-Gov Portal
      </h1>
      <p className="text-lg md:text-xl mb-8">
        Access government services, submit requests, track status, and make payments — all online.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
