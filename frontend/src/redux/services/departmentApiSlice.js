import { baseApiSlice, tagTypes } from './baseApiSlice';

export const departmentApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDepartment: builder.mutation({
      query: (data) => ({
        url: '/departments',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.departments], // Invalidate list
    }),
    listDepartments: builder.query({
      query: () => ({
        url: '/departments',
        method: 'GET',
      }),
      providesTags: [tagTypes.departments], // Provide list
    }),
    getDepartment: builder.query({
      query: (id) => ({
        url: `/departments/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [
        { type: tagTypes.department, id },
      ],
    }),
    updateDepartment: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/departments/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        tagTypes.departments, // Invalidate list
        { type: tagTypes.department, id }, // Invalidate single
      ],
    }),
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/departments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        tagTypes.departments, // Invalidate list
        { type: tagTypes.department, id }, // Invalidate single
      ],
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useListDepartmentsQuery,
  useGetDepartmentQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApiSlice;