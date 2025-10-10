// src/components/payments/PaymentActionModal.jsx
import { useEffect } from "react";

export default function PaymentActionModal({ open, onClose, onConfirm, action }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  const isConfirm = action === "confirm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md mx-4 rounded-lg shadow-lg p-6 relative">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          {isConfirm ? "Confirm Payment" : "Reject Payment"}
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to {isConfirm ? "confirm" : "reject"} this payment?
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(action)}
            className={`px-4 py-2 text-white rounded-lg ${
              isConfirm
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isConfirm ? "Confirm" : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
}
