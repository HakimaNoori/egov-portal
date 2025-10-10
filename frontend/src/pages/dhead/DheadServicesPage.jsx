import { useState } from "react";
import { useListServicesQuery } from "../../redux/services/serviceApiSlice";
import { useGetProfileQuery } from "../../redux/services/authApiSlice";

export default function DheadServicesPage() {
  const { data: profile } = useGetProfileQuery();
  const { data: services = [], isLoading, isError } = useListServicesQuery();
  const [selectedService, setSelectedService] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Filter services to show only those in the department head's department
  const departmentServices = services.filter(
    service => service.department_id === profile?.department_id
  );

  const openDetailsModal = (service) => {
    setSelectedService(service);
    setShowDetailsModal(true);
  };

  const closeModal = () => {
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
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Department Services Management</h2>
            <p className="text-gray-600 mt-2">
              Manage and oversee all services in your department
            </p>
          </div>
          <div className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-lg">
            {departmentServices[0]?.Department?.name || "Your Department"}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        {departmentServices.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏢</div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No Services in Your Department</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              There are currently no services assigned to your department. 
              Contact the administrator to add services to your department.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Managing {departmentServices.length} service{departmentServices.length !== 1 ? 's' : ''} in your department
              </p>
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                Department Head View
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentServices.map((service) => (
                <div
                  key={service.id}
                  className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-200 bg-white"
                >
                  <div className="space-y-4">
                    {/* Service Header */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {service.Department?.name || "Department Service"}
                      </p>
                    </div>

                    {/* Service Description */}
                    <div>
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {service.description || "No description available for this service."}
                      </p>
                    </div>

                    {/* Service Fee */}
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-bold text-green-600">
                        ${parseFloat(service.fee || 0).toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        Service Fee
                      </span>
                    </div>

                    {/* Action Button - Read Only */}
                    <div className="pt-2">
                      <button
                        onClick={() => openDetailsModal(service)}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Manage Service
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Service Details Modal */}
      {showDetailsModal && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Service Management</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-gray-800 mb-3">Service Information</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Service Name</label>
                        <p className="font-medium text-gray-800">{selectedService.name}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Department</label>
                        <p className="font-medium text-gray-800">
                          {selectedService.Department?.name || "General Services"}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Service ID</label>
                        <p className="font-medium text-gray-800">#{selectedService.id}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-gray-800 mb-3">Financial Information</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Service Fee</label>
                        <p className="text-2xl font-bold text-green-600">
                          ${parseFloat(selectedService.fee || 0).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Created Date</label>
                        <p className="font-medium text-gray-800">
                          {new Date(selectedService.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-800 mb-3">Service Description</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedService.description || "No detailed description available for this service."}
                  </p>
                </div>
              </div>

              {/* Department Head Responsibilities */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-800 mb-3">Department Head Responsibilities</h4>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Final approval authority for service requests in your department</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Review requests that have been processed by officers</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Approve or reject service requests based on department policies</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Monitor service performance and request volumes</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Manage officers assigned to service processing</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Service Statistics Placeholder */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-800 mb-3">Service Overview</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">-</div>
                    <div className="text-gray-600">Pending Requests</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">-</div>
                    <div className="text-gray-600">Approved This Month</div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-4 border-t">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}