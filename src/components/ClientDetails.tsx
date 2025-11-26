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

  // set to form(used to create table)
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

  if (isLoading) return <div>Loading details...</div>;
  if (!client) return <div>Client not found</div>;

  return (
    <div>
      <button onClick={() => navigate('/')}>&larr; Back to List</button>
      
      {!isEditing ? (
        //display
        <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '20px' }}>
          <h2>{client.name}</h2>
          <p><strong>Email:</strong> {client.email}</p>
          <p><strong>Company:</strong> {client.company}</p>
          <button onClick={() => setIsEditing(true)}>Edit Client</button>
        </div>
      ) : (

        //editing details
        <form onSubmit={handleUpdate} style={{ marginTop: '20px', border: '1px solid #ddd', padding: '20px' }}>
          <h2>Edit Client</h2>
          <div style={{ marginBottom: '10px' }}>
            <label>Name: </label>
            <input 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Email: </label>
            <input 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Company: </label>
            <input 
              value={formData.company} 
              onChange={(e) => setFormData({...formData, company: e.target.value})} 
            />
          </div>
          <button type="submit" style={{ background: 'blue', color: 'white' }}>Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)} style={{ marginLeft: '10px' }}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ClientDetails;