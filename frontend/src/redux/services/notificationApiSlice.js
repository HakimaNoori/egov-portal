import { baseApiSlice, tagTypes } from './baseApiSlice';

export const notificationApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Admin/System: create a notification
    createNotification: builder.mutation({
      query: (data) => ({
        url: '/notifications',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.notifications],
    }),

    // User: get my notifications
    getMyNotifications: builder.query({
      query: () => '/notifications/my',
      providesTags: [tagTypes.notifications],
    }),

    // User: mark as read
    markAsRead: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: 'PUT',
      }),
      invalidatesTags: [tagTypes.notifications],
    }),

    // Admin: list all notifications
    listAllNotifications: builder.query({
      query: () => '/notifications',
      providesTags: [tagTypes.notifications],
    }),
  }),
});

export const {
  useCreateNotificationMutation,
  useGetMyNotificationsQuery,
  useMarkAsReadMutation,
  useListAllNotificationsQuery,
} = notificationApiSlice;