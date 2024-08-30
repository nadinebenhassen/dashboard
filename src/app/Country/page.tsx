'use client'
import { useState } from 'react';
import axios from 'axios';

const AddCountryForm = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3002/countries', { name, image });

      alert('Country added successfully');
      setName('');
      setImage('');
    } catch (error) {
      console.error('Error adding country', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Country Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL:</label>
          <textarea
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white font-medium rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add Country
        </button>
      </form>
    </div>
  );
};

export default AddCountryForm;
