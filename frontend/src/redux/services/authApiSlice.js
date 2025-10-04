import { baseApiSlice } from "./baseApiSlice";

export const authApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/users/register",
                method: "POST",
                body: data,
            }),
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/users/login",
                method: "POST",
                body: data,
            }),
        }),
    }),
});  

export const { useRegisterMutation, useLoginMutation } = authApiSlice;
    