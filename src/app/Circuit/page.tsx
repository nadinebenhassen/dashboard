"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [editingCircuit, setEditingCircuit] = useState<Circuit | null>(null);
  const [newCircuit, setNewCircuit] = useState<Circuit | null>(null);

  interface Circuit {
    id: string;
    title: string;
    description: string;
    duration: string;
    location: string;
    price: string;
    season: string;
    imageUrl: string[];
  }

  useEffect(() => {
    const fetchCircuits = async () => {
      try {
        const response = await axios.get('http://localhost:3002/circuits');
        setCircuits(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des circuits!', error);
      }
    };

    fetchCircuits();
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce circuit ?')) {
      axios.delete(`http://localhost:3002/circuits/${id}`)
        .then(() => {
          setCircuits((prevCircuits) => prevCircuits.filter((circuit) => circuit.id !== id));
          alert('Circuit supprimé avec succès');
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression du circuit', error);
        });
    }
  };

  const handleSubmit = (circuit: Circuit) => {
    if (circuit.id) {
      axios.put(`http://localhost:3002/circuits/${circuit.id}`, circuit)
        .then((response) => {
          setCircuits((prevCircuits) => prevCircuits.map((c) => (c.id === circuit.id ? response.data : c)));
          setEditingCircuit(null);
        })
        .catch((error) => {
          console.error('Erreur lors de la mise à jour du circuit', error);
        });
    } else {
      axios.post('http://localhost:3002/circuits', circuit)
        .then((response) => {
          setCircuits((prevCircuits) => [...prevCircuits, response.data]);
          setNewCircuit(null);
        })
        .catch((error) => {
          console.error('Erreur lors de la création du circuit', error);
        });
    }
  };

  const handleAddNew = () => {
    setNewCircuit({
      id: '',
      title: '',
      description: '',
      duration: '',
      location: '',
      price: '',
      season: '',
      imageUrl: []
    });
  };

  const handleEdit = (circuit: Circuit) => {
    setEditingCircuit(circuit);
  };

  return (
    <div className="flex flex-col gap-5 w-full p-6">
      <h1 className="text-3xl font-bold mb-4">Circuits</h1>

      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 self-end"
        onClick={handleAddNew}
      >
        Ajouter un circuit
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700 uppercase">
              <th className="px-4 py-2 border">Titre</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Durée</th>
              <th className="px-4 py-2 border">Lieu</th>
              <th className="px-4 py-2 border">Prix</th>
              <th className="px-4 py-2 border">Saison</th>
              <th className="px-4 py-2 border">Images</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {circuits.length > 0 ? (
              circuits.map((circuit) => (
                <tr key={circuit.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{circuit.title}</td>
                  <td className="px-4 py-2 border truncate max-w-xs">{circuit.description}</td>
                  <td className="px-4 py-2 border">{circuit.duration}</td>
                  <td className="px-4 py-2 border">{circuit.location}</td>
                  <td className="px-4 py-2 border">{circuit.price}</td>
                  <td className="px-4 py-2 border">{circuit.season}</td>
                  <td className="px-4 py-2 border">{circuit.imageUrl?.join(', ') || 'Aucune image'}</td>
                  <td className="px-4 py-2 border flex gap-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                      onClick={() => handleEdit(circuit)}
                    >
                      Modifier
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      onClick={() => handleDelete(circuit.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center px-4 py-2">
                  Aucun circuit trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(editingCircuit || newCircuit) && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">
            {editingCircuit ? `Modifier le circuit` : 'Ajouter un nouveau circuit'}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(editingCircuit || newCircuit!);
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Titre</label>
              <input
                type="text"
                value={(editingCircuit || newCircuit)?.title || ''}
                onChange={(e) => {
                  const updatedCircuit = { ...(editingCircuit || newCircuit)!, title: e.target.value };
                  editingCircuit ? setEditingCircuit(updatedCircuit) : setNewCircuit(updatedCircuit);
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={(editingCircuit || newCircuit)?.description || ''}
                onChange={(e) => {
                  const updatedCircuit = { ...(editingCircuit || newCircuit)!, description: e.target.value };
                  editingCircuit ? setEditingCircuit(updatedCircuit) : setNewCircuit(updatedCircuit);
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Durée</label>
              <input
                type="text"
                value={(editingCircuit || newCircuit)?.duration || ''}
                onChange={(e) => {
                  const updatedCircuit = { ...(editingCircuit || newCircuit)!, duration: e.target.value };
                  editingCircuit ? setEditingCircuit(updatedCircuit) : setNewCircuit(updatedCircuit);
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Lieu</label>
              <input
                type="text"
                value={(editingCircuit || newCircuit)?.location || ''}
                onChange={(e) => {
                  const updatedCircuit = { ...(editingCircuit || newCircuit)!, location: e.target.value };
                  editingCircuit ? setEditingCircuit(updatedCircuit) : setNewCircuit(updatedCircuit);
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Prix</label>
              <input
                type="text"
                value={(editingCircuit || newCircuit)?.price || ''}
                onChange={(e) => {
                  const updatedCircuit = { ...(editingCircuit || newCircuit)!, price: e.target.value };
                  editingCircuit ? setEditingCircuit(updatedCircuit) : setNewCircuit(updatedCircuit);
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Saison</label>
              <input
                type="text"
                value={(editingCircuit || newCircuit)?.season || ''}
                onChange={(e) => {
                  const updatedCircuit = { ...(editingCircuit || newCircuit)!, season: e.target.value };
                  editingCircuit ? setEditingCircuit(updatedCircuit) : setNewCircuit(updatedCircuit);
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Image URLs (séparées par des virgules)</label>
              <input
                type="text"
                value={(editingCircuit || newCircuit)?.imageUrl?.join(', ') || ''}
                onChange={(e) => {
                  const imageUrls = e.target.value.split(',').map((url) => url.trim());
                  const updatedCircuit = { ...(editingCircuit || newCircuit)!, imageUrl: imageUrls };
                  editingCircuit ? setEditingCircuit(updatedCircuit) : setNewCircuit(updatedCircuit);
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editingCircuit ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
