import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: ['Transactions'],
  endpoints: (builder)=>({
    getTransactions: builder.query({ query:(params='') => `/transactions${params? '?'+new URLSearchParams(params) : ''}`, providesTags:['Transactions'] }),
    addTransaction: builder.mutation({ query:(body)=>({url:'/transactions', method:'POST', body}), invalidatesTags:['Transactions'] }),
    deleteTransaction: builder.mutation({ query:(id)=>({url:`/transactions/${id}`, method:'DELETE'}), invalidatesTags:['Transactions'] }),
  })
});

export const { useGetTransactionsQuery, useAddTransactionMutation, useDeleteTransactionMutation } = transactionsApi;
