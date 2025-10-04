import { baseApiSlice } from "./baseApiSlice";

export const documentApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchDocuments: builder.query({
            query: () => ({
                url: "/documents",
                method: "GET",
            }),
        }),
        uploadDocument: builder.mutation({
            query: (data) => ({
                url: "/documents",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useUploadDocumentMutation, useFetchDocumentQuery } = documentApiSlice;