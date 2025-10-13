const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' }
];

export default function RequestFilters({ 
  filters, 
  onFilterChange, 
  onDateRangeChange, 
  onClearFilters, 
  services = [] 
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Search & Filter</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Search by ID, name, email, or service..."
            value={filters.searchTerm}
            onChange={(e) => onFilterChange('searchTerm', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            {STATUS_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Service Type Filter - Only shows department-specific services */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Type
          </label>
          <select
            value={filters.serviceType}
            onChange={(e) => onFilterChange('serviceType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">All Services</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range - Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={filters.dateRange.start}
            onChange={(e) => onDateRangeChange('start', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Date Range - End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            value={filters.dateRange.end}
            onChange={(e) => onDateRangeChange('end', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="mt-4 flex flex-wrap gap-2">
        {filters.searchTerm && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Search: {filters.searchTerm}
            <button
              onClick={() => onFilterChange('searchTerm', '')}
              className="ml-1 hover:bg-blue-200 rounded-full w-4 h-4 flex items-center justify-center"
            >
              ×
            </button>
          </span>
        )}
        {filters.status && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Status: {STATUS_OPTIONS.find(s => s.value === filters.status)?.label}
            <button
              onClick={() => onFilterChange('status', '')}
              className="ml-1 hover:bg-purple-200 rounded-full w-4 h-4 flex items-center justify-center"
            >
              ×
            </button>
          </span>
        )}
        {filters.serviceType && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Service: {services.find(s => s.id === parseInt(filters.serviceType))?.name || `ID: ${filters.serviceType}`}
            <button
              onClick={() => onFilterChange('serviceType', '')}
              className="ml-1 hover:bg-green-200 rounded-full w-4 h-4 flex items-center justify-center"
            >
              ×
            </button>
          </span>
        )}
        {(filters.dateRange.start || filters.dateRange.end) && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            Date: {filters.dateRange.start || 'Any'} to {filters.dateRange.end || 'Any'}
            <button
              onClick={() => {
                onDateRangeChange('start', '');
                onDateRangeChange('end', '');
              }}
              className="ml-1 hover:bg-orange-200 rounded-full w-4 h-4 flex items-center justify-center"
            >
              ×
            </button>
          </span>
        )}
      </div>
    </div>
  );
}