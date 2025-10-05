import DheadLayout from "../../components/layout/DheadLayout";

export default function DheadDashboard() {
  return (
    <DheadLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Department Head Dashboard</h1>
        <p className="text-gray-600">
          Welcome, Department Head. You can manage services, approve or reject
          requests, and track department payments.
        </p>
      </div>
    </DheadLayout>
  );
}
