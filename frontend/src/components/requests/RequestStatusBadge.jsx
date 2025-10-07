import React from "react";

export default function RequestStatusBadge({ status }) {
  const classes =
    status === "pending"
      ? "bg-yellow-100 text-yellow-800"
      : status === "reviewed"
      ? "bg-blue-100 text-blue-800"
      : status === "approved"
      ? "bg-green-100 text-green-800"
      : status === "rejected"
      ? "bg-red-100 text-red-800"
      : "bg-gray-100 text-gray-800";

  return <span className={`px-2 py-1 rounded-full text-xs ${classes}`}>{status}</span>;
}
