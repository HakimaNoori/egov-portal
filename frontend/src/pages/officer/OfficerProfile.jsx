import { useGetProfileQuery } from "../../redux/services/authApiSlice";
import { useListDepartmentsQuery } from "../../redux/services/departmentApiSlice";

export default function OfficerProfile() {
  const { data: user, isLoading, isError } = useGetProfileQuery();
  const { data: departments = [], isLoading: loadingDepartments } = useListDepartmentsQuery();

  if (isLoading) return <div className="p-6">Loading profile...</div>;
  if (isError || !user) return <div className="p-6 text-red-600">Failed to load profile</div>;

  // Match department by ID
  const userDepartment = departments.find((dep) => dep.id === user.department_id);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Officer Profile</h2>

      <div className="space-y-3 text-gray-700">
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Role:</span> {user.role}
        </p>
        <p>
          <span className="font-semibold">Department:</span>{" "}
          {loadingDepartments
            ? "Loading..."
            : userDepartment
            ? userDepartment.name
            : "-"}
        </p>
      </div>
    </div>
  );
}
