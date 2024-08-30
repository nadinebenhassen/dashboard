// components/AddCountryForm.tsx
"use client"
import { useState } from 'react';
import axios from 'axios';

const AddCountryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('/api/countries/add', { name, description });
      alert('Country added successfully');
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding country', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Country Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit">Add Country</button>
    </form>
  );
};

export default AddCountryForm;
