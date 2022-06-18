import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_API_DB_BASEURL;

const headers = {
  "Content-Type": "application/json",
};

export const maintenanceApi = createApi({
  reducerPath: "maintenanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ["MAINTENANCE"],
  endpoints: (builder) => ({
    getMaintenance: builder.query({
      query: (idToken) => ({
        url: `/maintenance.json?auth=${idToken}`,
        method: "get",
        headers,
      }),
      providesTags: "MAINTENANCE",
    }),
  }),
});

export const { useGetMaintenanceQuery } = maintenanceApi;
