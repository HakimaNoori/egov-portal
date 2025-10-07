import { useState } from "react";
import {
  useListUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../redux/services/authApiSlice";
import { useListDepartmentsQuery } from "../../redux/services/departmentApiSlice";

export default function AdminUsersList() {
  const { data: users = [], isLoading, isError, error } = useListUsersQuery();
  const { data: departments = [], isLoading: loadingDepartments } = useListDepartmentsQuery();

  const [createUser, { isLoading: creating }] = useCreateUserMutation();
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();

  // --- Form states
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "citizen",
    department_id: "",
  });

  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ role: "", department_id: "" });

  // --- Handlers
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // Force department_id to null for admin and citizen roles
      const department_id = (createForm.role === "citizen" || createForm.role === "admin") 
        ? null 
        : (createForm.department_id || null);

      await createUser({
        name: createForm.name,
        email: createForm.email,
        password: createForm.password,
        role: createForm.role,
        department_id: department_id,
      }).unwrap();

      setCreateForm({
        name: "",
        email: "",
        password: "",
        role: "citizen",
        department_id: "",
      });
    } catch (err) {
      alert(err?.data?.message || err.message || "Create failed");
    }
  };

  const startEdit = (u) => {
    setEditingUser(u);
    setEditForm({ 
      role: u.role, 
      department_id: u.department_id || "" 
    });
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setEditForm({ role: "", department_id: "" });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      // Force department_id to null for admin and citizen roles
      const department_id = (editForm.role === "citizen" || editForm.role === "admin") 
        ? null 
        : (editForm.department_id || null);

      await updateUser({
        id: editingUser.id,
        role: editForm.role,
        department_id: department_id,
      }).unwrap();
      cancelEdit();
    } catch (err) {
      alert(err?.data?.message || err.message || "Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this user permanently?")) return;
    try {
      await deleteUser(id).unwrap();
    } catch (err) {
      alert(err?.data?.message || err.message || "Delete failed");
    }
  };

  // --- Helper to get department name
  const getDepartmentName = (id, role) => {
    if (role === "admin") return "None (Admin)";
    if (role === "citizen") return "None (Citizen)";
    if (id === null || id === undefined || id === "") return "None";
    const dept = departments?.find((d) => d.id === id);
    return dept ? dept.name : `#${id}`;
  };

  return (
    <div className="p-6 space-y-8">
      {/* ---------- CREATE USER CARD ---------- */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Create New User</h2>
        <form
          onSubmit={handleCreate}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <input
            placeholder="Name"
            value={createForm.name}
            required
            onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
            className="p-2 border rounded-lg"
          />
          <input
            placeholder="Email"
            value={createForm.email}
            required
            type="email"
            onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
            className="p-2 border rounded-lg"
          />
          <input
            placeholder="Password"
            value={createForm.password}
            required
            type="password"
            onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
            className="p-2 border rounded-lg"
          />
          <select
            value={createForm.role}
            onChange={(e) => {
              const newRole = e.target.value;
              // Force department to be cleared when role is admin or citizen
              setCreateForm({
                ...createForm,
                role: newRole,
                department_id: (newRole === "citizen" || newRole === "admin") ? "" : createForm.department_id
              });
            }}
            className="p-2 border rounded-lg"
          >
            <option value="citizen">citizen</option>
            <option value="officer">officer</option>
            <option value="dhead">dhead</option>
            <option value="admin">admin</option>
          </select>

          {/* --- Department dropdown --- */}
          <select
            value={createForm.department_id}
            onChange={(e) =>
              setCreateForm({ ...createForm, department_id: e.target.value })
            }
            className="p-2 border rounded-lg"
            disabled={createForm.role === "citizen" || createForm.role === "admin"}
          >
            <option value="">Select Department (optional)</option>
            {loadingDepartments ? (
              <option disabled>Loading...</option>
            ) : (
              departments?.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))
            )}
          </select>

          <button
            type="submit"
            disabled={creating}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {creating ? "Creating..." : "Create User"}
          </button>
        </form>
      </section>

      {/* ---------- USERS LIST CARD ---------- */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">All Users</h2>
          {isLoading && <span className="text-sm text-gray-500">Loading...</span>}
        </div>

        {isError ? (
          <div className="text-red-600">{error?.message || "Failed to load users"}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-3 py-2 text-left">Name</th>
                  <th className="px-3 py-2 text-left">Email</th>
                  <th className="px-3 py-2 text-left">Role</th>
                  <th className="px-3 py-2 text-left">Department</th>
                  <th className="px-3 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2">{u.name}</td>
                    <td className="px-3 py-2">{u.email}</td>
                    <td className="px-3 py-2">{u.role}</td>
                    <td className="px-3 py-2">{getDepartmentName(u.department_id, u.role)}</td>
                    <td className="px-3 py-2 flex gap-2">
                      <button
                        onClick={() => startEdit(u)}
                        className="px-3 py-1 border rounded-lg hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        disabled={deleting}
                        className="px-3 py-1 border border-red-500 text-red-600 rounded-lg hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ---------- EDIT MODAL ---------- */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md relative">
            <h4 className="text-lg font-semibold mb-4">
              Edit User: <span className="text-blue-600">{editingUser.name}</span>
            </h4>

            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Role</label>
                <select
                  value={editForm.role}
                  onChange={(e) => {
                    const newRole = e.target.value;
                    // Force department to be cleared when role is admin or citizen
                    setEditForm({
                      ...editForm,
                      role: newRole,
                      department_id: (newRole === "citizen" || newRole === "admin") ? "" : editForm.department_id
                    });
                  }}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="citizen">citizen</option>
                  <option value="officer">officer</option>
                  <option value="dhead">dhead</option>
                  <option value="admin">admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Department</label>
                <select
                  value={editForm.department_id || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, department_id: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                  disabled={editForm.role === "citizen" || editForm.role === "admin"}
                >
                  <option value="">Select Department (optional)</option>
                  {departments?.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {updating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}