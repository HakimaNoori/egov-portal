// hooks/useRequestFilters.js
import { useState, useMemo } from 'react';

export function useRequestFilters(requests = []) {
  const [filters, setFilters] = useState({
    searchTerm: '',
    status: '',
    serviceType: '',
    dateRange: {
      start: '',
      end: ''
    }
  });

  const filteredRequests = useMemo(() => {
    return requests.filter(request => {
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch = 
          request.id.toString().includes(filters.searchTerm) ||
          request.applicant?.name?.toLowerCase().includes(searchLower) ||
          request.Service?.name?.toLowerCase().includes(searchLower) ||
          request.applicant?.email?.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status && request.status !== filters.status) {
        return false;
      }

      // Service type filter - Compare numbers properly
      if (filters.serviceType) {
        const filterServiceId = parseInt(filters.serviceType);
        const requestServiceId = request.service_id || request.Service?.id;
        
        if (requestServiceId !== filterServiceId) {
          return false;
        }
      }

      // Date range filter
      if (filters.dateRange.start || filters.dateRange.end) {
        const requestDate = new Date(request.created_at);
        
        if (filters.dateRange.start) {
          const startDate = new Date(filters.dateRange.start);
          if (requestDate < startDate) return false;
        }
        
        if (filters.dateRange.end) {
          const endDate = new Date(filters.dateRange.end);
          endDate.setHours(23, 59, 59, 999); // End of day
          if (requestDate > endDate) return false;
        }
      }

      return true;
    });
  }, [requests, filters]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateDateRange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [key]: value
      }
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      status: '',
      serviceType: '',
      dateRange: {
        start: '',
        end: ''
      }
    });
  };

  return {
    filters,
    filteredRequests,
    updateFilter,
    updateDateRange,
    clearFilters
  };
}