import { baseApiSlice, tagTypes } from "./baseApiSlice";

// Inject authentication and user-related endpoints into the base API slice
export const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Register a new user
    register: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    // Login an existing user
    login: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    // Get the profile of the currently authenticated user
    getProfile: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    // Create a new user (admin functionality)
    createUser: builder.mutation({
      query: (data) => ({
        url: "/users/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    // Update an existing user's information
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.users, tagTypes.user],
    }),
    // Delete a user by ID
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.users],
    }),
    // List all users (admin functionality)
    listUsers: builder.query({
      query: () => ({
        url: "/users/",
        method: "GET",
      }),
      providesTags: [tagTypes.users],
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useRegisterMutation,
  useLoginMutation,
  useGetProfileQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useListUsersQuery,
} = authApiSlice;
