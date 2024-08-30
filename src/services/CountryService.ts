// services/countryService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3002/Countries';

export type Country = {
  id: number;
  name: string;
  image: string;
};

export const getCountries = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getCountryById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createCountry = async (country: Country) => {
  const response = await axios.post(API_URL, country);
  return response.data;
};

export const updateCountry = async (country: Country) => {
  const response = await axios.put(`${API_URL}/${country.id}`, country);
  return response.data;
};

export const deleteCountry = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
