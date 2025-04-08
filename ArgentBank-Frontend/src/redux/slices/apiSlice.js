// apiSlice.js

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../../services/baseQueryWithAuth";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: baseQueryWithAuth, // Utilise baseQueryWithAuth pour ajouter le token

  tagTypes: ["User"],

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",

        method: "POST",

        body: credentials,
      }),
    }),

    getUserProfile: builder.query({
      query: () => "/user/profile",

      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: (userData) => ({
        url: "/user/profile",

        method: "PUT",

        body: userData,
      }),

      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,

  useGetUserProfileQuery,

  useUpdateProfileMutation,
} = apiSlice;
