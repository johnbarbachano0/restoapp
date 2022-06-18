import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { transformFirebaseResponse } from "../components/misc";

const baseUrl = process.env.REACT_APP_API_DB_BASEURL;

const headers = {
  "Content-Type": "application/json",
};

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ["PRODUCTS"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (idToken) => ({
        url: `/products.json?auth=${idToken}`, //&id=${id}
        method: "get",
        headers,
      }),
      transformResponse: (result) =>
        transformFirebaseResponse(result, "productId"),
      providesTags: (result) => {
        return result
          ? result?.map(({ id }) => ({
              type: "PRODUCTS",
              id,
            }))
          : [{ type: "PRODUCTS" }];
      },
    }),
    postProduct: builder.mutation({
      query: ({ newProduct, idToken }) => ({
        url: `/products.json?auth=${idToken}`,
        method: "post",
        headers,
        body: newProduct,
      }),
      invalidatesTags: [{ type: "PRODUCTS" }],
    }),
    patchProduct: builder.mutation({
      query: ({ id, editedProduct, idToken }) => ({
        url: `/products/${id}.json?auth=${idToken}`,
        method: "PATCH",
        headers,
        body: editedProduct,
      }),
      invalidatesTags: ({ id }) => [{ type: "PRODUCTS", id }],
    }),
    deleteProduct: builder.mutation({
      query: ({ id, statusUpdate, idToken }) => ({
        url: `/products/${id}.json?auth=${idToken}`,
        method: "delete",
        headers,
        body: statusUpdate,
      }),
      invalidatesTags: ({ id }) => [{ type: "PRODUCTS", id }],
    }),
  }),
});

export const {
  useGetProductQuery,
  usePostProductMutation,
  usePatchProductMutation,
  useDeleteProductMutation,
} = productApi;
