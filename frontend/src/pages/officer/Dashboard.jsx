import OfficerLayout from "../../components/layout/OfficerLayout";

export default function OfficerDashboard() {
  return (
    <OfficerLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Officer Dashboard</h1>
        <p className="text-gray-600">
          Welcome, Officer. You can review requests assigned to you, upload
          documents, and mark them as reviewed.
        </p>
      </div>
    </OfficerLayout>
  );
}
