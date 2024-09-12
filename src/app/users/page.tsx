"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<User | null>(null);

  interface User {
    _id?: string;
    username: string;
    email: string;
    role: string;
    password: string;
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3002/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs!', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      axios.delete(`http://localhost:3002/users/${id}`)
        .then(() => {
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
          alert('Utilisateur supprimé avec succès');
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression de l\'utilisateur', error);
        });
    }
  };

  const handleSubmit = (user: User) => {
    if (user._id) {
      axios.put(`http://localhost:3002/users/${user._id}`, user)
        .then((response) => {
          setUsers((prevUsers) => prevUsers.map((u) => (u._id === user._id ? response.data : u)));
          setEditingUser(null);
        })
        .catch((error) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
        });
    } else {
      axios.post('http://localhost:3002/users', user)
        .then((response) => {
          setUsers((prevUsers) => [...prevUsers, response.data]);
          setNewUser(null);
        })
        .catch((error) => {
          console.error('Erreur lors de la création de l\'utilisateur', error);
        });
    }
  };

  const handleAddNew = () => {
    setNewUser({ username: '', email: '', role: '', password: '' });
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  return (
    <div className="flex flex-col gap-5 w-full p-6">
      <h1 className="text-3xl font-bold mb-4"> USER</h1>

      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 self-end"
        onClick={handleAddNew}
      >
        Add User
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700 uppercase">
              <th className="px-4 py-2 border">User name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Password</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{user.username}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.role}</td>
                  <td className="px-4 py-2 border truncate max-w-xs">{user.password}</td>
                  <td className="px-4 py-2 border flex gap-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                      onClick={() => handleEdit(user)}
                    >
                      Modifier
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      onClick={() => handleDelete(user._id!)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center px-4 py-2">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(editingUser || newUser) && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">
            {editingUser ? `Modifier l'utilisateur` : 'Ajouter un nouvel utilisateur'}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(editingUser || newUser!);
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
              <input
                type="text"
                value={(editingUser || newUser)?.username}
                onChange={(e) => {
                  const updatedUser = { ...(editingUser || newUser)!, username: e.target.value };
                  editingUser ? setEditingUser(updatedUser) : setNewUser(updatedUser);
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={(editingUser || newUser)?.email}
                onChange={(e) => {
                  const updatedUser = { ...(editingUser || newUser)!, email: e.target.value };
                  editingUser ? setEditingUser(updatedUser) : setNewUser(updatedUser);
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Rôle</label>
              <input
                type="text"
                value={(editingUser || newUser)?.role}
                onChange={(e) => {
                  const updatedUser = { ...(editingUser || newUser)!, role: e.target.value };
                  editingUser ? setEditingUser(updatedUser) : setNewUser(updatedUser);
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
              <input
                type="password"
                value={(editingUser || newUser)?.password}
                onChange={(e) => {
                  const updatedUser = { ...(editingUser || newUser)!, password: e.target.value };
                  editingUser ? setEditingUser(updatedUser) : setNewUser(updatedUser);
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {editingUser ? 'Mettre à jour' : 'Ajouter'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingUser(null);
                  setNewUser(null);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
