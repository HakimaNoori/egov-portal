// src/pages/citizen/PaymentSuccess.jsx (Mock payment page)
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/citizen/dashboard");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="py-6 text-center">
      <h1 className="text-3xl font-bold mb-6 text-green-600">
        Payment Successful!
      </h1>
      <p className="text-gray-700 mb-4">
        Your service fee has been processed. Thank you for using E-Gov Portal.
      </p>
      <p className="text-gray-600">Redirecting to dashboard in 5 seconds...</p>
    </div>
  );
}

export default PaymentSuccess;
