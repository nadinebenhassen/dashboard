// services/circuitService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3002/Circuits';

export type Circuit = {
  
  title: string;
  location: string;
  duration: string;
  price: string;
  description: string;
  season: string;
  imageUrl: string;
};

export const getCircuits = async (): Promise<Circuit[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getCircuitById = async (title: string): Promise<Circuit> => {
  const response = await axios.get(`${API_URL}/${title}`);
  return response.data;
};

export const createCircuit = async (circuit: Circuit): Promise<Circuit> => {
  const response = await axios.post(API_URL, circuit);
  return response.data;
};

export const updateCircuit = async (circuit: Circuit): Promise<Circuit> => {
  const response = await axios.put(`${API_URL}/${circuit.title}`, circuit);
  return response.data;
};

export const deleteCircuit = async (title: string): Promise<void> => {
  await axios.delete(`${API_URL}/${title}`);
};

export const getCircuitByName = async (circuitName: string): Promise<Circuit | null> => {
  try {
    const response = await axios.get(`${API_URL}/title/${circuitName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching circuit by name:", error);
    return null; 
  }
};
