import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = process.env.REACT_APP_API_LOGIN_BASEURL;
const apiKey = process.env.REACT_APP_API_KEY;

const headers = {
  "Content-Type": "application/json",
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ["AUTH"],
  endpoints: (builder) => ({
    authRegister: builder.mutation({
      query: (data) => ({
        url: `:signUp?key=${apiKey}`,
        method: "post",
        headers,
        body: data,
      }),
      invalidatesTags: () => [{ type: "AUTH" }],
    }),
    authLogin: builder.mutation({
      query: (data) => ({
        url: `:signInWithPassword?key=${apiKey}`,
        method: "post",
        headers,
        body: data,
      }),
      invalidatesTags: () => [{ type: "AUTH" }],
    }),
  }),
});

export const { useAuthRegisterMutation, useAuthLoginMutation } = authApi;
