// api/auth.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.NEXT_SERVER_BASE_URL || '';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    checkAuth: builder.query({
      query: () => '/check-auth',
    }),
  }),
});

export const { useLoginMutation, useCheckAuthQuery } = authApi;
