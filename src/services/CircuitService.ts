// services/circuitService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3002/Circuits';

export type Circuit = {
  id:string
  title: string;
  location: string;
  duration: string;
  price: string;
  description: string;
  season: string;
  imageUrl: [string];
};

export const getCircuits = async (): Promise<Circuit[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getCircuitById = async (id: string): Promise<Circuit> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createCircuit = async (circuit: Circuit): Promise<Circuit> => {
  try {
    console.log('Creating circuit with data:', circuit); // Ajoutez cette ligne pour voir les données envoyées
    const response = await axios.post(API_URL, circuit);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data); // Ajoutez cette ligne pour voir la réponse d'erreur
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};


export const updateCircuit = async (circuit: Circuit): Promise<Circuit> => {
  const response = await axios.put(`${API_URL}/${circuit.id}`, circuit);
  return response.data;
};

export const deleteCircuit = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const getCircuitByName = async (id: string): Promise<Circuit | null> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching circuit by name:", error);
    return null; 
  }
};
