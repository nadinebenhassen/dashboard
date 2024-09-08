import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs'; // Pour faciliter la gestion des dates

const Dashboard = () => {
  const [demandes, setDemandes] = useState<Demande[]>([]);

  interface Demande {
    _id: string;
    nom: string;
    prenom: string;
    tel: string;
    email: string;
    objet: string;
    message: string;
    createdAt: string; // Assurez-vous que ce champ est bien dans vos données
  }

  useEffect(() => {
    axios.get('http://localhost:3002/demande')
      .then((response) => {
        setDemandes(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the demandes!', error);
      });
  }, []);

  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:3002/demande/${id}`)
      .then(() => {
        setDemandes((prevDemandes) => prevDemandes.filter((demande) => demande._id !== id));
        alert('Demande supprimée avec succès');
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de la demande', error);
      });
  };

  // Fonction pour déterminer si une demande est "nouvelle"
  const isNew = (createdAt: string) => {
    const currentTime = dayjs();
    const demandeTime = dayjs(createdAt);
    const hoursDifference = currentTime.diff(demandeTime, 'hour');
    return hoursDifference <= 24; // Considère comme "nouvelle" si elle a été créée dans les 24 heures
  };

  return (
    <div className="flex flex-col gap-5 w-full p-6">
      <h1 className="text-3xl font-bold mb-4"> Les demandes</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700 uppercase">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nom</th>
              <th className="px-4 py-2 border">Prénom</th>
              <th className="px-4 py-2 border">Téléphone</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Objet</th>
              <th className="px-4 py-2 border">Message</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((demande) => (
              <tr
                key={demande._id}
                className={`hover:bg-gray-50 ${isNew(demande.createdAt) ? 'bg-green-100' : ''}`} // Appliquer une couleur de fond différente si c'est "nouvelle"
              >
                <td className="px-4 py-2 border">{demande._id}</td>
                <td className="px-4 py-2 border">{demande.nom}</td>
                <td className="px-4 py-2 border">{demande.prenom}</td>
                <td className="px-4 py-2 border">{demande.tel}</td>
                <td className="px-4 py-2 border">{demande.email}</td>
                <td className="px-4 py-2 border">{demande.objet}</td>
                <td className="px-4 py-2 border">{demande.message}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleDelete(demande._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
