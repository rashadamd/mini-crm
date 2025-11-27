import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetClientsQuery, useAddClientMutation, useDeleteClientMutation } from '../services/clientsApi';
import type { Client } from '../services/clientsApi';

const ClientList = () => {
  const { data: clients, error, isLoading } = useGetClientsQuery();
  const [addClient] = useAddClientMutation();
  const [deleteClient] = useDeleteClientMutation();

  const [isModalOpen, setModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', email: '', company: '' });

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    await addClient(newClient); 
    setNewClient({ name: '', email: '', company: '' });
    setModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if(confirm("Are you sure you want to remove this client?")) {
      await deleteClient(id);
    }
  }

  if (isLoading) return <div className="p-10 text-center text-slate-500">Loading clients...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error loading data.</div>;

  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Client Details</h1>
        </div>
        <button 
          onClick={() => setModalOpen(true)} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-all active:scale-95"
        >
          + Add New Client
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
              <th className="px-6 py-4">Client Name</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clients?.map((client: Client) => (
              <tr key={client.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    
                    <div>
                      <div className="font-medium text-slate-900">{client.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 font-medium">{client.company}</td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-500">{client.email}</div>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/client/${client.id}`} className="text-indigo-600 hover:text-indigo-800 font-medium text-sm mr-4 hover:underline">
                    View & Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(client.id)} 
                    className="text-slate-400 hover:text-red-600 font-medium text-sm transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {clients && clients.length === 0 && (
           <div className="p-10 text-center text-slate-500">No clients found. Click "Add New Client" to start.</div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h2 className="font-bold text-lg text-slate-800">Create New Client</h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleAddClient} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input 
                  placeholder="eg. Rashad Ahamed"
                  value={newClient.name} 
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})} 
                  required 
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email"
                  placeholder="eg. rashad@example.com"
                  value={newClient.email} 
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})} 
                  required 
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                <input 
                  placeholder="eg. Vision"
                  value={newClient.company} 
                  onChange={(e) => setNewClient({...newClient, company: e.target.value})} 
                  required 
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-sm transition-colors">
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientList;