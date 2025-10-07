import { useState } from "react";
import {
  useListDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} from "../../redux/services/departmentApiSlice";

export default function AdminDepartmentsList() {
  const { data: departments = [], isLoading, isError, error } = useListDepartmentsQuery();
  const [createDepartment, { isLoading: creating }] = useCreateDepartmentMutation();
  const [updateDepartment, { isLoading: updating }] = useUpdateDepartmentMutation();
  const [deleteDepartment, { isLoading: deleting }] = useDeleteDepartmentMutation();

  const [createForm, setCreateForm] = useState({ name: "", description: "" });
  const [editingDept, setEditingDept] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", description: "" });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createDepartment(createForm).unwrap();
      setCreateForm({ name: "", description: "" });
    } catch (err) {
      alert(err?.data?.message || err.message);
    }
  };

  const startEdit = (dept) => {
    setEditingDept(dept);
    setEditForm({ name: dept.name, description: dept.description || "" });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await updateDepartment({ id: editingDept.id, ...editForm }).unwrap();
      setEditingDept(null);
    } catch (err) {
      alert(err?.data?.message || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this department?")) return;
    try {
      await deleteDepartment(id).unwrap();
    } catch (err) {
      alert(err?.data?.message || err.message);
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* CREATE DEPARTMENT */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Create Department</h2>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Name"
            value={createForm.name}
            onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
            className="p-2 border rounded-lg"
            required
          />
          <input
            placeholder="Description (optional)"
            value={createForm.description}
            onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
            className="p-2 border rounded-lg"
          />
          <button
            type="submit"
            disabled={creating}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {creating ? "Creating..." : "Create Department"}
          </button>
        </form>
      </section>

      {/* LIST DEPARTMENTS */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Departments</h2>
          {isLoading && <span className="text-sm text-gray-500">Loading...</span>}
        </div>

        {isError ? (
          <div className="text-red-600">{error?.message || "Failed to load"}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-3 py-2 text-left">Name</th>
                  <th className="px-3 py-2 text-left">Description</th>
                  <th className="px-3 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((d) => (
                  <tr key={d.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2">{d.name}</td>
                    <td className="px-3 py-2">{d.description || "—"}</td>
                    <td className="px-3 py-2 flex gap-2">
                      <button
                        onClick={() => startEdit(d)}
                        className="px-3 py-1 border rounded-lg hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(d.id)}
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

      {/* EDIT MODAL */}
      {editingDept && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h4 className="text-lg font-semibold mb-4">
              Edit Department:{" "}
              <span className="text-blue-600">{editingDept.name}</span>
            </h4>

            <form onSubmit={handleEdit} className="space-y-4">
              <input
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
              <textarea
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                placeholder="Description"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingDept(null)}
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
