import { Link } from "react-router-dom";

export default function ServerError() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center px-6">
      <h1 className="text-6xl font-bold text-red-600 mb-4">500</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Internal Server Error
      </h2>
      <p className="text-gray-600 mb-6">
        Something went wrong on our side. Please try again later.
      </p>
      <Link
        to="/"
        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
