import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getContractors: builder.query({
      query: () => "/contractor",
    }),
    getContractorById: builder.query({
      query: (id) => `/contractor/${id}`,
    }),
    createContractor: builder.mutation({
      query: (newContractor) => ({
        url: "/contractor",
        method: "POST",
        body: newContractor,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    updateHourlyRate: builder.mutation({
      query: ({ id, hourlyRate }) => ({
        url: `/contractor/hourly-rate/${id}`,
        method: "PUT",
        body: { hourlyRate },
      }),
    }),
    deleteContractor: builder.mutation({
      query: (id) => ({
        url: `/contractor/${id}`,
        method: "DELETE",
      }),
    }),
    getContractorBilling: builder.query({
      query: () => "/contractor/billing",
    }),
    getContractorBillingById: builder.query({
      query: (id) => `/contractor/billing/${id}`,
    }),
  }),
});

export const {
  useGetContractorsQuery,
  useGetContractorByIdQuery,
  useCreateContractorMutation,
  useDeleteContractorMutation,
  useUpdateHourlyRateMutation,
  useGetContractorBillingQuery,
  useGetContractorBillingByIdQuery,
} = apiSlice;

export default apiSlice;
