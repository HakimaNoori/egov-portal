import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_API_URL;

export const tagTypes = {
  user: "User",
  users: "Users",
  department: "Department",
  departments: "Departments",
  request: "Request",
  requests: "Requests",
  document: "Document",
  documents: "Documents",
  payment: "Payment",
  payments: "Payments",
  service: "Service",
  services: "Services",
  notification: "Notification",
  notifications: "Notifications",
  myNotification: "MyNotification",
};

export const baseApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: Object.values(tagTypes),
  endpoints: () => ({}),
});
