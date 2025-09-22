// src/components/Notification.jsx (Optional for in-app notifications)
import { useEffect } from "react";

function Notification({ message, type = "info", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} text-white p-4 rounded shadow-lg`}
    >
      {message}
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
        ×
      </button>
    </div>
  );
}

export default Notification;
