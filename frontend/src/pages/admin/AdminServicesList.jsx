import { useState } from "react";
import {
  useListServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from "../../redux/services/serviceApiSlice";
import { useListDepartmentsQuery } from "../../redux/services/departmentApiSlice";

export default function AdminServicesList() {
  const { data: services = [], isLoading, isError, error } = useListServicesQuery();
  const { data: departments = [], isLoading: loadingDepartments } = useListDepartmentsQuery();

  const [createService, { isLoading: creating }] = useCreateServiceMutation();
  const [updateService, { isLoading: updating }] = useUpdateServiceMutation();
  const [deleteService, { isLoading: deleting }] = useDeleteServiceMutation();

  // --- Form States
  const [createForm, setCreateForm] = useState({
    department_id: "",
    name: "",
    description: "",
    fee: "",
  });

  const [editingService, setEditingService] = useState(null);
  const [editForm, setEditForm] = useState({
    department_id: "",
    name: "",
    description: "",
    fee: "",
  });

  // --- Create Handler
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createService({
        department_id: createForm.department_id,
        name: createForm.name,
        description: createForm.description,
        fee: parseFloat(createForm.fee) || 0,
      }).unwrap();

      setCreateForm({ department_id: "", name: "", description: "", fee: "" });
    } catch (err) {
      alert(err?.data?.message || err.message || "Create failed");
    }
  };

  // --- Edit Handlers
  const startEdit = (s) => {
    setEditingService(s);
    setEditForm({
      department_id: s.department_id || "",
      name: s.name,
      description: s.description || "",
      fee: s.fee || "",
    });
  };

  const cancelEdit = () => {
    setEditingService(null);
    setEditForm({ department_id: "", name: "", description: "", fee: "" });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await updateService({
        id: editingService.id,
        department_id: editForm.department_id,
        name: editForm.name,
        description: editForm.description,
        fee: parseFloat(editForm.fee) || 0,
      }).unwrap();
      cancelEdit();
    } catch (err) {
      alert(err?.data?.message || err.message || "Update failed");
    }
  };

  // --- Delete Handler
  const handleDelete = async (id) => {
    if (!confirm("Delete this service permanently?")) return;
    try {
      await deleteService(id).unwrap();
    } catch (err) {
      alert(err?.data?.message || err.message || "Delete failed");
    }
  };

  // --- Helper: Get Department Name
  const getDepartmentName = (id) => {
    if (!id) return "—";
    const dept = departments?.find((d) => d.id === id);
    return dept ? dept.name : `#${id}`;
  };

  return (
    <div className="p-6 space-y-8">
      {/* ---------- CREATE SERVICE ---------- */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Create New Service</h2>
        <form
          onSubmit={handleCreate}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <select
            value={createForm.department_id}
            onChange={(e) =>
              setCreateForm({ ...createForm, department_id: e.target.value })
            }
            className="p-2 border rounded-lg"
            required
          >
            <option value="">Select Department</option>
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

          <input
            placeholder="Service Name"
            value={createForm.name}
            required
            onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
            className="p-2 border rounded-lg"
          />
          <input
            placeholder="Fee"
            type="number"
            min="0"
            step="0.01"
            value={createForm.fee}
            onChange={(e) => setCreateForm({ ...createForm, fee: e.target.value })}
            className="p-2 border rounded-lg"
          />
          <textarea
            placeholder="Description (optional)"
            value={createForm.description}
            onChange={(e) =>
              setCreateForm({ ...createForm, description: e.target.value })
            }
            className="p-2 border rounded-lg col-span-full"
          />

          <button
            type="submit"
            disabled={creating}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {creating ? "Creating..." : "Create Service"}
          </button>
        </form>
      </section>

      {/* ---------- SERVICE LIST ---------- */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">All Services</h2>
          {isLoading && <span className="text-sm text-gray-500">Loading...</span>}
        </div>

        {isError ? (
          <div className="text-red-600">{error?.message || "Failed to load services"}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-3 py-2 text-left">Service Name</th>
                  <th className="px-3 py-2 text-left">Department</th>
                  <th className="px-3 py-2 text-left">Fee</th>
                  <th className="px-3 py-2 text-left">Description</th>
                  <th className="px-3 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2">{s.name}</td>
                    <td className="px-3 py-2">{getDepartmentName(s.department_id)}</td>
                    <td className="px-3 py-2">${s.fee}</td>
                    <td className="px-3 py-2 max-w-[300px] truncate">
                      {s.description || "—"}
                    </td>
                    <td className="px-3 py-2 flex gap-2">
                      <button
                        onClick={() => startEdit(s)}
                        className="px-3 py-1 border rounded-lg hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
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
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md relative">
            <h4 className="text-lg font-semibold mb-4">
              Edit Service: <span className="text-blue-600">{editingService.name}</span>
            </h4>

            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Department</label>
                <select
                  value={editForm.department_id}
                  onChange={(e) =>
                    setEditForm({ ...editForm, department_id: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="">Select Department</option>
                  {departments?.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Service Name</label>
                <input
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Fee</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={editForm.fee}
                  onChange={(e) =>
                    setEditForm({ ...editForm, fee: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
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
