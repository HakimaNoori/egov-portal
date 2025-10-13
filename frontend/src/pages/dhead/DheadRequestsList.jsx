import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useListRequestsQuery } from "../../redux/services/requestApiSlice";
import { useListServicesQuery } from "../../redux/services/serviceApiSlice";
import RequestStatusBadge from "../../components/requests/RequestStatusBadge";
import RequestFilters from "../../components/requests/RequestFilters";
import { useRequestFilters } from "../../hooks/useRequestFilters";

export default function DheadRequestsList() {
  const { user } = useSelector(state => state.auth);
  const departmentId = user?.department_id;
  
  // Get ALL requests and services
  const { data: allRequests = [], isLoading, isError } = useListRequestsQuery();
  const { data: allServices = [] } = useListServicesQuery();

  // Filter requests by department on frontend
  const departmentRequests = allRequests.filter(request => 
    request.Service?.department_id === departmentId
  );

  // Filter services by department on frontend
  const departmentServices = allServices.filter(service => 
    service.department_id === departmentId
  );

  // Get department name
  const departmentName = departmentServices[0]?.Department?.name || 
                        departmentRequests[0]?.Service?.Department?.name || 
                        "Your Department";
  
  const {
    filters,
    filteredRequests,
    updateFilter,
    updateDateRange,
    clearFilters
  } = useRequestFilters(departmentRequests);

  // Calculate analytics from FILTERED requests data
  const analytics = {
    total: filteredRequests.length,
    pending: filteredRequests.filter(r => r.status === 'pending').length,
    reviewed: filteredRequests.filter(r => r.status === 'reviewed').length,
    approved: filteredRequests.filter(r => r.status === 'approved').length,
    rejected: filteredRequests.filter(r => r.status === 'rejected').length,
    awaitingApproval: filteredRequests.filter(r => r.status === 'reviewed').length,
  };

  // Calculate percentages based on filtered results
  const percentages = {
    pending: analytics.total > 0 ? ((analytics.pending / analytics.total) * 100).toFixed(1) : 0,
    reviewed: analytics.total > 0 ? ((analytics.reviewed / analytics.total) * 100).toFixed(1) : 0,
    approved: analytics.total > 0 ? ((analytics.approved / analytics.total) * 100).toFixed(1) : 0,
    rejected: analytics.total > 0 ? ((analytics.rejected / analytics.total) * 100).toFixed(1) : 0,
    awaitingApproval: analytics.total > 0 ? ((analytics.awaitingApproval / analytics.total) * 100).toFixed(1) : 0,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section with Analytics */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Request Reviews</h2>
            <p className="text-gray-600 mt-1">Overview of all requests in {departmentName}</p>
          </div>
          <div className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-lg">
            {departmentName} Dashboard
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          {/* Total Requests */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Total Requests</p>
                <p className="text-2xl font-bold text-blue-900">{analytics.total}</p>
                <p className="text-xs text-blue-700">
                  {departmentRequests.length > 0 ? `${((filteredRequests.length / departmentRequests.length) * 100).toFixed(1)}% of all` : '0%'}
                </p>
              </div>
              <div className="text-blue-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Awaiting Dhead Approval */}
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800">Awaiting Approval</p>
                <p className="text-2xl font-bold text-purple-900">{analytics.awaitingApproval}</p>
                <p className="text-xs text-purple-700">{percentages.awaitingApproval}%</p>
              </div>
              <div className="text-purple-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Pending Requests */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-800">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-900">{analytics.pending}</p>
                <p className="text-xs text-yellow-700">{percentages.pending}%</p>
              </div>
              <div className="text-yellow-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Reviewed Requests */}
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-800">Officer Reviewed</p>
                <p className="text-2xl font-bold text-indigo-900">{analytics.reviewed}</p>
                <p className="text-xs text-indigo-700">{percentages.reviewed}%</p>
              </div>
              <div className="text-indigo-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Approved Requests */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Approved</p>
                <p className="text-2xl font-bold text-green-900">{analytics.approved}</p>
                <p className="text-xs text-green-700">{percentages.approved}%</p>
              </div>
              <div className="text-green-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Rejected Requests */}
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800">Rejected</p>
                <p className="text-2xl font-bold text-red-900">{analytics.rejected}</p>
                <p className="text-xs text-red-700">{percentages.rejected}%</p>
              </div>
              <div className="text-red-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats and Priority Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Stats */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-3">{departmentName} Overview</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center justify-between p-2 bg-white rounded">
                <span className="text-gray-600">Total Requests</span>
                <span className="font-medium">{analytics.total}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded">
                <span className="text-gray-600">Requiring Your Action</span>
                <span className="font-medium text-purple-600">{analytics.awaitingApproval}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded">
                <span className="text-gray-600">Under Officer Review</span>
                <span className="font-medium">{analytics.pending}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded">
                <span className="text-gray-600">Completion Rate</span>
                <span className="font-medium text-green-600">
                  {analytics.total > 0 ? 
                    (((analytics.approved + analytics.rejected) / analytics.total) * 100).toFixed(1) + '%' 
                    : '0%'
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Priority Actions */}
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-medium text-purple-800 mb-3">Priority Actions</h4>
            <div className="space-y-2">
              {analytics.awaitingApproval > 0 ? (
                <div className="flex items-center justify-between p-2 bg-white rounded border border-purple-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Review {analytics.awaitingApproval} request(s) awaiting your approval</span>
                  </div>
                  <Link 
                    to="#awaiting-approval" 
                    className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700"
                  >
                    Review Now
                  </Link>
                </div>
              ) : (
                <div className="text-sm text-purple-700 p-2 bg-white rounded">
                  No pending approvals at this time
                </div>
              )}
              
              {analytics.pending > 0 ? (
                <div className="flex items-center justify-between p-2 bg-white rounded border border-yellow-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">{analytics.pending} request(s) pending officer review</span>
                  </div>
                  <span className="text-xs text-gray-500">Monitoring</span>
                </div>
              ) : (
                <div className="text-sm text-green-700 p-2 bg-white rounded">
                  All requests have been reviewed by officers
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section with Department-Specific Services */}
      <RequestFilters
        filters={filters}
        onFilterChange={updateFilter}
        onDateRangeChange={updateDateRange}
        onClearFilters={clearFilters}
        services={departmentServices}
      />

      {/* Requests Table Section */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            {departmentName} Requests {filteredRequests.length !== departmentRequests.length && 
              `(${filteredRequests.length} of ${departmentRequests.length} filtered)`
            }
          </h3>
          <div className="text-sm text-gray-500">
            Showing {filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading requests...</div>
        ) : isError ? (
          <div className="text-center py-8 text-red-600">Failed to load requests</div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="flex flex-col items-center justify-center">
              <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg font-medium text-gray-600">
                {departmentRequests.length === 0 ? `No requests in ${departmentName}` : 'No requests match your filters'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {departmentRequests.length === 0 
                  ? `When citizens submit requests for ${departmentName} services, they will appear here.` 
                  : 'Try adjusting your search criteria or clear filters.'
                }
              </p>
              {departmentRequests.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">#</th>
                  <th className="px-4 py-3 text-left font-medium">Applicant</th>
                  <th className="px-4 py-3 text-left font-medium">Service</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Officer</th>
                  <th className="px-4 py-3 text-left font-medium">Created</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((r) => (
                  <tr key={r.id} className="border-b hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-4 py-3 font-medium">{r.id}</td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-gray-800">{r.applicant?.name ?? "Unknown"}</div>
                        <div className="text-xs text-gray-500">{r.applicant?.email ?? ""}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{r.Service?.name ?? "—"}</div>
                      <div className="text-xs text-gray-500">
                        {r.Service?.Department?.name ?? departmentName}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <RequestStatusBadge status={r.status} />
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {r.officer_id ? (r.officer?.name || `Officer #${r.officer_id}`) : "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Link 
                        to={`/dhead/requests/${r.id}`} 
                        className="inline-flex items-center px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}