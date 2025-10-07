import { baseApiSlice } from './baseApiSlice';
import { tagTypes } from './baseApiSlice';

export const paymentApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Citizen makes payment
    createPayment: builder.mutation({
      query: (data) => ({
        url: '/payments',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.payments],
    }),
    // Get my payments (citizen)
    getMyPayments: builder.query({
      query: () => '/payments/my',
      providesTags: [tagTypes.payments],
    }),
    // Admin/officer/dhead can list all
    getAllPayments: builder.query({
      query: () => '/payments',
      providesTags: [tagTypes.payments],
    }),
    // Update payment method (citizen, before confirmation)
    updatePaymentMethod: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/payments/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [tagTypes.payments],
    }),
    // Admin confirms/rejects payment
    confirmOrRejectPayment: builder.mutation({
      query: ({ id, status }) => ({
        url: `/payments/${id}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: [tagTypes.payments],
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useGetMyPaymentsQuery,
  useGetAllPaymentsQuery,
  useUpdatePaymentMethodMutation,
  useConfirmOrRejectPaymentMutation,
} = paymentApiSlice;