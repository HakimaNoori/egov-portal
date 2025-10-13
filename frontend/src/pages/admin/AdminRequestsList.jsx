import { Link } from "react-router-dom";
import { useListRequestsQuery } from "../../redux/services/requestApiSlice";
import { useListServicesQuery } from "../../redux/services/serviceApiSlice";
import RequestStatusBadge from "../../components/requests/RequestStatusBadge";
import RequestFilters from "../../components/requests/RequestFilters";
import { useRequestFilters } from "../../hooks/useRequestFilters";

export default function AdminRequestsList() {
  const { data: requests = [], isLoading, isError } = useListRequestsQuery();
  const { data: services = [] } = useListServicesQuery();
  
  const {
    filters,
    filteredRequests,
    updateFilter,
    updateDateRange,
    clearFilters
  } = useRequestFilters(requests);

  // Calculate analytics from filtered requests data
  const analytics = {
    total: filteredRequests.length,
    pending: filteredRequests.filter(r => r.status === 'pending').length,
    reviewed: filteredRequests.filter(r => r.status === 'reviewed').length,
    approved: filteredRequests.filter(r => r.status === 'approved').length,
    rejected: filteredRequests.filter(r => r.status === 'rejected').length,
  };

  // Calculate percentages
  const percentages = {
    pending: analytics.total > 0 ? ((analytics.pending / analytics.total) * 100).toFixed(1) : 0,
    reviewed: analytics.total > 0 ? ((analytics.reviewed / analytics.total) * 100).toFixed(1) : 0,
    approved: analytics.total > 0 ? ((analytics.approved / analytics.total) * 100).toFixed(1) : 0,
    rejected: analytics.total > 0 ? ((analytics.rejected / analytics.total) * 100).toFixed(1) : 0,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section with Analytics */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">All Requests (Admin)</h2>
            <p className="text-gray-600 mt-1">Complete overview of all system requests</p>
          </div>
          <div className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-lg">
            Administrator Dashboard
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {/* Total Requests */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Total Requests</p>
                <p className="text-2xl font-bold text-blue-900">{analytics.total}</p>
                <p className="text-xs text-blue-700">
                  {requests.length > 0 ? `${((filteredRequests.length / requests.length) * 100).toFixed(1)}% of all` : '0%'}
                </p>
              </div>
              <div className="text-blue-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Pending Requests */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-800">Pending</p>
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
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800">Reviewed</p>
                <p className="text-2xl font-bold text-purple-900">{analytics.reviewed}</p>
                <p className="text-xs text-purple-700">{percentages.reviewed}%</p>
              </div>
              <div className="text-purple-600">
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

        {/* Quick Stats Bar */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">Total: {analytics.total} requests</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-700">{analytics.pending} pending review</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-700">{analytics.reviewed} reviewed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">{analytics.approved} approved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-700">{analytics.rejected} rejected</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <RequestFilters
        filters={filters}
        onFilterChange={updateFilter}
        onDateRangeChange={updateDateRange}
        onClearFilters={clearFilters}
        services={services}
      />

      {/* Requests Table Section */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            All System Requests {filteredRequests.length !== requests.length && 
              `(${filteredRequests.length} of ${requests.length} filtered)`
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
                {requests.length === 0 ? 'No requests in system' : 'No requests match your filters'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {requests.length === 0 
                  ? 'When citizens submit requests, they will appear here.' 
                  : 'Try adjusting your search criteria or clear filters.'
                }
              </p>
              {requests.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                  <th className="px-4 py-3 text-left font-medium">Department</th>
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
                        <div className="text-xs text-gray-400 capitalize">{r.applicant?.role}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{r.Service?.name ?? "—"}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-600">
                        {r.Service?.Department?.name ?? "—"}
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
                        to={`/admin/requests/${r.id}`} 
                        className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
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