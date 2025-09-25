import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers;
    },
  }),
  endpoints: () => ({}),
});