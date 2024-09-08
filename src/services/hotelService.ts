// services/hotelService.ts
import axios from 'axios';
import { LucideArrowDownRight } from 'lucide-react';

const API_URL = 'http://localhost:3002/Hotels';
export type Hotel = {
    id: string;
    title: string;
    location: string;
    price: string;
    description: string;
    image: string;
  };
export const getHotels = async () => {
  const response = await axios.get(API_URL);
  return (response).data;
};

export const getHotelById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createHotel = async (hotel: Hotel) => {
  const response = await axios.post(API_URL, hotel);
  return response.data;
};

export const updateHotel = async (hotel: Hotel) => {
  const response = await axios.put(`${API_URL}/${hotel.id}`, hotel);
  return response.data;
};

export const deleteHotel = async (title: string) => {
  await axios.delete(`${API_URL}/title/${title}`);

  
};
export const getHotelByName = async (hotelname: string): Promise<Hotel | null> => {
  try {
    const response = await axios.get(`${API_URL}/title/${hotelname}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching hotel by name:", error);
    return null; 
  }};