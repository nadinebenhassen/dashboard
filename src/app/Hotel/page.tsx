'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageTitle from '@/components/PageTitle';
import { DataTable } from '@/components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { deleteHotel, getHotelByName } from '@/services/hotelService';

type Hotel = {
  id: string;
  title: string;
  location: string;
  price: string;
  description: string;
  image: string;
};

const HotelComponent = () => {
  const [data, setData] = useState<Hotel[]>([]);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      const response = await axios.get('http://localhost:3002/hotels'); // Adjust endpoint as necessary
      setData(response.data);
    } catch (error) {
      console.error('Error loading hotels', error);
    }
  };
console.log(data)
  const handleSave = async (hotel: Hotel) => {
    try {
      if (hotel.id) {
        // Update existing hotel
        await axios.put(`http://localhost:3002/hotels/${hotel.id}`, hotel);
      } else {
        // Add new hotel
        await axios.post('http://localhost:3002/hotels', hotel);
      }
      loadHotels(); // Reload data after save
      setEditingHotel(null);
    } catch (error) {
      console.error('Error saving hotel', error);
    }
  };

  const handleAddNew = () => {
    setEditingHotel({
      id: '',
      title: '',
      location: '',
      price: '',
      description: '',
      image: '',
    });
  };

  const handleEdit = (hotel: Hotel) => {
    setEditingHotel(hotel);
  };

  const handleDelete = async (hotelname: string) => {
   
    try {
      // Supposons que vous ayez une fonction pour récupérer un hôtel par son nom
      const hotel = await getHotelByName(hotelname);
  
      if (hotel && hotel.title) {
        // Suppression de l'hôtel via son ID
        await deleteHotel(hotel.title);
        console.log("Hotel deleted successfully");
        // Vous pouvez mettre à jour l'interface utilisateur ici, par exemple
      } else {
        console.log("Hotel not found");
      }
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };
  
  

  const columns: ColumnDef<Hotel>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'location',
      header: 'Location',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'image',
      header: 'Image',
      cell: (info) => <img src='{info.getValue()} 'alt="Hotel" className="h-10 w-10" />,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.original)}
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.getValue('title'))}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Hotels" />
      <button
        onClick={handleAddNew}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 self-end"
      >
        Add Hotel
      </button>
      <DataTable columns={columns} data={data} />
      {editingHotel && (
        <EditForm
          hotel={editingHotel}
          onSave={handleSave}
          onCancel={() => setEditingHotel(null)}
        />
      )}
    </div>
  );
};

type EditFormProps = {
  hotel: Hotel;
  onSave: (hotel: Hotel) => void;
  onCancel: () => void;
};

const EditForm = ({ hotel, onSave, onCancel }: EditFormProps) => {
  const [formData, setFormData] = useState<Hotel>(hotel);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default HotelComponent;
