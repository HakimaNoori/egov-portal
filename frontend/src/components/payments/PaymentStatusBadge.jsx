export default function PaymentStatusBadge({ status }) {
  const colorMap = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${
        colorMap[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
}
