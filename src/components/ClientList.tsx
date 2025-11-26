import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetClientsQuery, useAddClientMutation, useDeleteClientMutation } from '../services/clientsApi';
import type { Client } from '../services/clientsApi';

const ClientList = () => {
  //fetch data
  const { data: clients, error, isLoading } = useGetClientsQuery();
  
  //for adding and deleting
  const [addClient] = useAddClientMutation();
  const [deleteClient] = useDeleteClientMutation();

  //modal visibility
  const [isModalOpen, setModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', email: '', company: '' });

  //add client
  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    await addClient(newClient); 

    setNewClient({ name: '', email: '', company: '' });
    setModalOpen(false);
  };

  //delete client
  const handleDelete = async (id: string) => {
    if(confirm("Are you sure?")) {
      await deleteClient(id);
    }
  }

  // fetch client details and render

  if (isLoading) return <div>Loading clients...</div>;
  if (error) return <div>Error loading data!</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Client List</h1>
        <button onClick={() => setModalOpen(true)} style={{ padding: '10px', marginLeft:'20px',background: 'green', color: 'white' }}>
          + Add Client
        </button>
      </div>

      <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients?.map((client: Client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.company}</td>
              <td>
                <Link to={`/client/${client.id}`}>
                    <button>View / Edit</button>
                </Link>
                <button onClick={() => handleDelete(client.id)} style={{ marginLeft: '10px', background: 'red', color: 'white' }}>
                    Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '5px', width: '300px' }}>
            <h2>Add New Client</h2>
            <form onSubmit={handleAddClient}>
              <div style={{ marginBottom: '10px'}}>
                <input 
                  placeholder="Name" 
                  value={newClient.name} 
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})} 
                  required 
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ marginBottom: '10px'}}>
                <input 
                  placeholder="Email" 
                  value={newClient.email} 
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})} 
                  required 
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ marginBottom: '10px'}}>
                <input 
                  placeholder="Company" 
                  value={newClient.company} 
                  onChange={(e) => setNewClient({...newClient, company: e.target.value})} 
                  required 
                  style={{ width: '100%' }}
                />
              </div>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setModalOpen(false)} style={{ marginLeft: '10px' }}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientList;