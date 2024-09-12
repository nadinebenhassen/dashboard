// services/hotelService.ts
import axios from 'axios';


const API_URL = 'http://localhost:3002/Hotels';

type Hotel = {
  _id?: string;
  title: string;
  location: string;
  image: string;
  price: string;
  link: string;
  category: 'national' | 'international';
  images?: string[];
  accommodation?: string;
  services?: string[];
};
export const getHotels = async () => {
  const response = await axios.get(API_URL);
  return response.data;
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
  const response = await axios.put(`${API_URL}/${hotel._id}`, hotel);
  return response.data;
};

export const deleteHotel = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};


export const getHotelByName = async (hotelname: string): Promise<Hotel | null> => {
  try {
    const response = await axios.get(`${API_URL}/title/${hotelname}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching hotel by name:", error);
    return null; 
  }};