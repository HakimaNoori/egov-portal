// src/redux/services/notificationApiSlice.js
import { baseApiSlice, tagTypes } from './baseApiSlice';

export const notificationApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🟩 Create a new notification (admin/system)
    createNotification: builder.mutation({
      query: (data) => ({
        url: '/notifications',
        method: 'POST',
        body: data,
      }),
      // invalidate myNotification so the user's list refetches automatically
      invalidatesTags: (result, error, arg) => [
        { type: tagTypes.notifications, id: 'LIST' },       // admin list
        { type: tagTypes.myNotification, id: 'LIST' },     // current user's list
      ],
    }),

    // 🟦 Get logged-in user's notifications
    getMyNotifications: builder.query({
      query: () => '/notifications/my',
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: tagTypes.myNotification, id })),
            { type: tagTypes.myNotification, id: 'LIST' },
          ]
          : [{ type: tagTypes.myNotification, id: 'LIST' }],
    }),

    // 🟨 Mark one as read (user)
    markAsRead: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, id) => [
        { type: tagTypes.myNotification, id },       // current user's notification
        { type: tagTypes.myNotification, id: 'LIST' }, // current user's list
      ],
    }),


    // 🟥 Admin: list all notifications
    listAllNotifications: builder.query({
      query: () => '/notifications',
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: tagTypes.notification, id })),
            { type: tagTypes.notifications, id: 'LIST' },
          ]
          : [{ type: tagTypes.notifications, id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateNotificationMutation,
  useGetMyNotificationsQuery,
  useMarkAsReadMutation,
  useListAllNotificationsQuery,
} = notificationApiSlice;
