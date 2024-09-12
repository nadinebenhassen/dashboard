'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageTitle from '@/components/PageTitle';
import { DataTable } from '@/components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { createHotel, deleteHotel, getHotelByName, updateHotel } from '@/services/hotelService';

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

const HotelComponent = () => {
  const [data, setData] = useState<Hotel[]>([]);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      const response = await axios.get('http://localhost:3002/hotels');
      setData(response.data);
    } catch (error) {
      console.error('Error loading hotels', error);
    }
  };
  const handleSave = async (hotel: Hotel) => {
    try {
      if (hotel._id) {
        await updateHotel(hotel);
      } else {
        await createHotel(hotel);
      }
      loadHotels();
      setEditingHotel(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error saving hotel:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };
  
  

  const handleAddNew = () => {
    setEditingHotel({
      title: '',
      location: '',
      image: '',
      price: '',
      link: '',
      category: 'national',
      images: [],
      accommodation: '',
      services: [],
    });
  };

  const handleEdit = (hotel: Hotel) => {
    setEditingHotel(hotel);
  };

  const handleDelete = async (hotelId: string) => {
    try {
      // Call deleteHotel directly with the ID
      await deleteHotel(hotelId);
      console.log('Hotel deleted successfully');
      loadHotels();
    } catch (error) {
      console.error('Error deleting hotel:', error);
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
      accessorKey: 'image',
      header: 'Image',
      cell: (info) => <img src={info.getValue() as string} alt="Hotel" className="h-10 w-10" />,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const hotel = row.original;
        return (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(hotel)}
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => {
                const hotelId = hotel._id;
                if (hotelId) {
                  handleDelete(hotelId);
                } else {
                  console.error('Hotel ID is missing');
                }
              }}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        );
      },
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Link</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          >
            <option value="national">National</option>
            <option value="international">International</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Accommodation</label>
          <input
            type="text"
            name="accommodation"
            value={formData.accommodation || ''}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Services</label>
          <textarea
            name="services"
            value={formData.services?.join(', ') || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                services: e.target.value.split(',').map((service) => service.trim()),
              })
            }
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-black rounded"
        >
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Save
        </button>
      </div>
    </form>
  );
};

export default HotelComponent;
