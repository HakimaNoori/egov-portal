import { useState } from "react";
import { useListServicesQuery } from "../../redux/services/serviceApiSlice";
import { useCreateRequestMutation } from "../../redux/services/requestApiSlice";

export default function CitizenServices() {
  const { data: services = [], isLoading, isError } = useListServicesQuery();
  const [createRequest, { isLoading: creating }] = useCreateRequestMutation();
  
  // Modal states
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleRequestService = async () => {
    if (!selectedService) return;
    
    try {
      await createRequest({ service_id: selectedService.id }).unwrap();
      setShowRequestModal(false);
      setSelectedService(null);
      alert("Service request submitted successfully!");
    } catch (err) {
      alert(err?.data?.message || err.message || "Failed to submit request");
    }
  };

  const openRequestModal = (service) => {
    setSelectedService(service);
    setShowRequestModal(true);
  };

  const openDetailsModal = (service) => {
    setSelectedService(service);
    setShowDetailsModal(true);
  };

  const closeModals = () => {
    setShowRequestModal(false);
    setShowDetailsModal(false);
    setSelectedService(null);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="text-center py-8">Loading services...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="text-center py-8 text-red-600">Failed to load services</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Available Services</h2>
        <p className="text-gray-600 mt-2">Browse and request services from various departments</p>
      </section>

      {/* Services Grid */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        {services.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No services available at the moment
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-200"
              >
                <div className="space-y-4">
                  {/* Service Header */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {service.Department?.name || "General Services"}
                    </p>
                  </div>

                  {/* Service Description */}
                  <div>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {service.description || "No description available"}
                    </p>
                  </div>

                  {/* Service Fee */}
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-green-600">
                      ${parseFloat(service.fee || 0).toFixed(2)}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => openRequestModal(service)}
                      disabled={creating}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 transition-colors duration-200"
                    >
                      {creating && selectedService?.id === service.id ? "Requesting..." : "Request Service"}
                    </button>
                    <button
                      onClick={() => openDetailsModal(service)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Request Service Modal */}
      {showRequestModal && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Request Service</h3>
            
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800">{selectedService.name}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Department: {selectedService.Department?.name || "General Services"}
                </p>
                <p className="text-sm text-gray-600">
                  Fee: ${parseFloat(selectedService.fee || 0).toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-700">
                  Are you sure you want to request this service? You will be able to upload required documents after submission.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={closeModals}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestService}
                  disabled={creating}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 transition-colors duration-200"
                >
                  {creating ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Details Modal */}
      {showDetailsModal && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Service Details</h3>
            
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Service Information</h4>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm text-gray-600">Service Name</label>
                      <p className="font-medium">{selectedService.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Department</label>
                      <p className="font-medium">
                        {selectedService.Department?.name || "General Services"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Service Fee</label>
                      <p className="font-medium text-green-600">
                        ${parseFloat(selectedService.fee || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Description</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {selectedService.description || "No detailed description available for this service."}
                  </p>
                </div>
              </div>

              {/* Additional Information */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-800 mb-3">What to Expect</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Submit your request and wait for officer review
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Upload required documents when requested
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Track your request status in real-time
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Receive notifications for status updates
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  onClick={closeModals}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    openRequestModal(selectedService);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  Request This Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}