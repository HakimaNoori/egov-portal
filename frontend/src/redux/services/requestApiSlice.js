import { baseApiSlice, tagTypes } from './baseApiSlice';

export const requestApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Apply for a service
    createRequest: builder.mutation({
      query: (data) => ({
        url: '/requests',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.requests],
    }),

    // View own requests
    myRequests: builder.query({
      query: () => '/requests/my',
      providesTags: [tagTypes.requests],
    }),

    // Officer/Dhead/Admin: list requests
    listRequests: builder.query({
      query: () => '/requests',
      providesTags: [tagTypes.requests],
    }),

    // Officer/Dhead/Admin: update request status
    updateRequest: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/requests/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [tagTypes.requests, tagTypes.request],
    }),

    // Upload new documents
    uploadDocuments: builder.mutation({
      query: ({ id, documents }) => {
        const formData = new FormData();
        documents.forEach((doc) => formData.append('documents', doc));
        return {
          url: `/requests/${id}/documents`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [tagTypes.documents, tagTypes.request],
    }),

    // View documents
    getDocuments: builder.query({
      query: (id) => `/requests/${id}/documents`,
      providesTags: [tagTypes.documents],
    }),

    // Update a document (replace file)
    updateDocument: builder.mutation({
      query: ({ id, docId, document }) => {
        const formData = new FormData();
        formData.append('document', document);
        return {
          url: `/requests/${id}/documents/${docId}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: [tagTypes.documents, tagTypes.request],
    }),
  }),
});

export const {
  useCreateRequestMutation,
  useMyRequestsQuery,
  useListRequestsQuery,
  useUpdateRequestMutation,
  useUploadDocumentsMutation,
  useGetDocumentsQuery,
  useUpdateDocumentMutation,
} = requestApiSlice;