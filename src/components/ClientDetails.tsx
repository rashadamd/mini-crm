import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetClientQuery, useUpdateClientMutation } from '../services/clientsApi';

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: client, isLoading } = useGetClientQuery(id || '');
  const [updateClient] = useUpdateClientMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });

  useEffect(() => {
    if (client) {
      setFormData({ name: client.name, email: client.email, company: client.company });
    }
  }, [client]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await updateClient({ id, ...formData });
      setIsEditing(false);
    }
  };

  if (isLoading) return <div className="text-center mt-20 text-slate-500">Loading details...</div>;
  if (!client) return <div className="text-center mt-20 text-red-500">Client not found</div>;

  return (
    <div className="max-w-xl mx-auto">

      <button 
        onClick={() => navigate('/')} 
        className="mb-6 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors flex items-center"
      >
        &larr; Back to Client List
      </button>

      {/* Details */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        
        <div className="h-12 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
        </div>

        <div className="pt-12 px-8 pb-8">
          
          {!isEditing ? (
            // View Client Details
            <div className="animate-fade-in">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">{client.name}</h1>
                  <p className="text-slate-500">Client ID: #{id}</p>
                </div>
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 hover:text-indigo-600 transition-all text-sm"
                >
                  Edit Profile
                </button>
              </div>

              <div className="mt-8 space-y-6">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</span>
                  <div className="text-lg text-slate-800 font-medium mt-1">{client.email}</div>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Company Name</span>
                  <div className="text-lg text-slate-800 font-medium mt-1">{client.company}</div>
                </div>
              </div>
            </div>
          ) : (

            //Edit Client Form
            <form onSubmit={handleUpdate} className="space-y-5 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                 <h2 className="text-xl font-bold text-slate-800">Edit Details</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                <input 
                  value={formData.company} 
                  onChange={(e) => setFormData({...formData, company: e.target.value})} 
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)} 
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="h-12 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;