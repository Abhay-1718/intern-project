import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import Modal from './Modal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        alert('Error fetching users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleCreateOrUpdateUser = async (userData) => {
    try {
      if (editUser) {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${editUser.id}`, userData);
        setUsers(users.map(user => (user.id === editUser.id ? response.data : user)));
      } else {
        const response = await axios.post('https://jsonplaceholder.typicode.com/users', userData);
        setUsers([...users, response.data]);
      }
      setModalOpen(false);
      setEditUser(null);
    } catch (error) {
      alert('Error saving user');
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${userToDelete.id}`);
      setUsers(users.filter(user => user.id !== userToDelete.id));
      setConfirmDeleteOpen(false);
    } catch (error) {
      alert('Error deleting user');
    }
  };

  const openEditModal = (user) => {
    setEditUser(user);
    setModalOpen(true);
  };

  const openDeleteConfirmation = (user) => {
    setUserToDelete(user);
    setConfirmDeleteOpen(true);
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div>
      <button onClick={() => { setModalOpen(true); setEditUser(null); }} className="bg-green-600 text-white p-2 mb-4 rounded hover:bg-green-700 transition">
        Add User
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4 border-b text-left">Name</th>
              <th className="py-3 px-4 border-b text-left">Email</th>
              <th className="py-3 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition`}>
                <td className="py-3 px-4 text-sm">{user.name}</td>
                <td className="py-3 px-4 text-sm">{user.email}</td>
                <td className="py-3 px-4 text-sm">
                  <button className="text-blue-600 hover:underline mr-2" onClick={() => openEditModal(user)}>Edit</button>
                  <button className="text-red-600 hover:underline" onClick={() => openDeleteConfirmation(user)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <UserForm user={editUser} onSubmit={handleCreateOrUpdateUser} />
      </Modal>

      <ConfirmDeleteModal
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={handleDeleteUser}
      />
    </div>
  );
};

export default UserTable;
