import React from "react";
import CitizenLayout from "../../components/layout/CitizenLayout";

export default function CitizenDashboard() {
  return (
    <CitizenLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Citizen Dashboard</h1>
        <p className="text-gray-600">
          Welcome to your dashboard. Here you can apply for services, check
          request statuses, make payments, and manage your profile.
        </p>
      </div>
    </CitizenLayout>
  );
}
