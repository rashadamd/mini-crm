import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
}

//mockAPI setup  
export const clientsApi = createApi({
  reducerPath: 'clientsApi',
  baseQuery: fetchBaseQuery({ 

    baseUrl: 'https://692683fa26e7e41498fa8958.mockapi.io/api/v1/' //endpoint URL(from mockAPI)

  }),
  
  // auto-refreshing data
  tagTypes: ['Client'], 
  endpoints: (builder) => ({
    
    //fetch all clients
    getClients: builder.query<Client[], void>({
      query: () => 'clients',
      providesTags: ['Client'],
    }),

    //fetch specific client
    getClient: builder.query<Client, string>({
      query: (id) => `clients/${id}`,
      providesTags: ['Client'],
    }),

    //add client
    addClient: builder.mutation<Client, Partial<Client>>({
      query: (body) => ({
        url: 'clients',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Client'], //check & refresh list
    }),

    //update client
    updateClient: builder.mutation<Client, Partial<Client> & { id: string }>({
      query: ({ id, ...patch }) => ({
        url: `clients/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Client'],
    }),

    //delete client
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