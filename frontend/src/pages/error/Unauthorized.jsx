import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 text-center px-6">
      <h1 className="text-6xl font-bold text-yellow-500 mb-4">403</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Unauthorized Access
      </h2>
      <p className="text-gray-600 mb-6">
        You don’t have permission to view this page.
      </p>
      <Link
        to="/"
        className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
