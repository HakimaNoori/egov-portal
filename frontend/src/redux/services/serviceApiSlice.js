import { baseApiSlice, tagTypes } from './baseApiSlice';

export const serviceApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // List all services
    listServices: builder.query({
      query: () => '/services',
      providesTags: [tagTypes.services],
    }),
    // Get one service
    getService: builder.query({
      query: (id) => `/services/${id}`,
      providesTags: (result, error, id) => [{ type: tagTypes.service, id }],
    }),
    // Create service
    createService: builder.mutation({
      query: (data) => ({
        url: '/services',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.services],
    }),
    // Update service
    updateService: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/services/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        tagTypes.services,
        { type: tagTypes.service, id },
      ],
    }),
    // Delete service
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        tagTypes.services,
        { type: tagTypes.service, id },
      ],
    }),
  }),
});

export const {
  useListServicesQuery,
  useGetServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApiSlice;