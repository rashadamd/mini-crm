import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Client structure
export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
}

// API Service
export const clientsApi = createApi({
  reducerPath: 'clientsApi',
  baseQuery: fetchBaseQuery({ 

    baseUrl: 'https://692683fa26e7e41498fa8958.mockapi.io/api/v1/' 

  }),
  
  // auto-refreshing data
  tagTypes: ['Client'], 
  endpoints: (builder) => ({
    
    //Fetch all clients
    getClients: builder.query<Client[], void>({
      query: () => 'clients',
      providesTags: ['Client'], // If 'Client' tag is invalidated, re-fetch this
    }),

    // Fetch ONE client by ID
    getClient: builder.query<Client, string>({
      query: (id) => `clients/${id}`,
      providesTags: ['Client'],
    }),

    // Add a new client
    addClient: builder.mutation<Client, Partial<Client>>({
      query: (body) => ({
        url: 'clients',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Client'], // This forces the list to refresh after adding!
    }),

    // Update a client
    updateClient: builder.mutation<Client, Partial<Client> & { id: string }>({
      query: ({ id, ...patch }) => ({
        url: `clients/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Client'],
    }),

    // Remove a client
    deleteClient: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `clients/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Client'],
    }),
  }),
});


export const { 
  useGetClientsQuery, 
  useGetClientQuery, 
  useAddClientMutation, 
  useUpdateClientMutation, 
  useDeleteClientMutation    
} = clientsApi;