'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageTitle from '@/components/PageTitle';
import { DataTable } from '@/components/DataTable';
import { ColumnDef } from '@tanstack/react-table';

type Voyage = {
  id: string;
  type: string;
  destination: string;
  price?: string;
  program?: string;
  image: string;
};

const VoyageComponent = () => {
  const [data, setData] = useState<Voyage[]>([]);
  const [editingVoyage, setEditingVoyage] = useState<Voyage | null>(null);

  useEffect(() => {
    loadVoyages();
  }, []);

  const loadVoyages = async () => {
    try {
      const response = await axios.get('http://localhost:3002/voyages');
      setData(response.data);
    } catch (error) {
      console.error('Error loading voyages', error);
    }
  };

  const handleSave = async (voyage: Voyage) => {
    try {
     
      if (voyage.id) {
        await axios.put(`http://localhost:3002/voyages/${voyage.id}`, voyage);
      } else {
        await axios.post('http://localhost:3002/voyages',voyage );
      }
      loadVoyages();
      setEditingVoyage(null);
    } catch (error) {
      console.error('Error saving voyage');
    }
  };
    
  

  const handleAddNew = () => {
    setEditingVoyage({
      id: '',
      type: '',
      destination: '',
      price: '',
      program: '',
      image: '',
    });
  };

  const handleEdit = (voyage: Voyage) => {
    setEditingVoyage(voyage);
  };

  const handleDelete = async (voyageId: string) => {
    try {
      await axios.delete(`http://localhost:3002/voyages/${voyageId}`);
      loadVoyages();
    } catch (error) {
      console.error('Error deleting voyage', error);
    }
  };

  const columns: ColumnDef<Voyage>[] = [
    {
      accessorKey: 'type',
      header: 'Type',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'destination',
      header: 'Destination',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: (info) => (info.getValue() ? `$${info.getValue()}` : 'N/A'),
    },
    {
      accessorKey: 'program',
      header: 'Program',
      cell: (info) => info.getValue() || 'N/A',
    },
    {
      accessorKey: 'image',
      header: 'Image',
      cell: (info) => <img src={info.getValue() as string} alt="Voyage" className="h-10 w-10" />,
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
            onClick={() => handleDelete(row.original.id)}
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
      <PageTitle title="Voyages" />
      <button
        onClick={handleAddNew}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 self-end"
      >
        Add Voyage
      </button>
      <DataTable columns={columns} data={data} />
      {editingVoyage && (
        <EditForm
          voyage={editingVoyage}
          onSave={handleSave}
          onCancel={() => setEditingVoyage(null)}
        />
      )}
    </div>
  );
};

type EditFormProps = {
  voyage: Voyage;
  onSave: (voyage: Voyage) => void;
  onCancel: () => void;
};

const EditForm = ({ voyage, onSave, onCancel }: EditFormProps) => {
  const [formData, setFormData] = useState<Voyage>({
    ...voyage,
    price: voyage.price ?? '',
    program: voyage.program ?? '',
  });

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
        <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Type</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="destination" className="block text-gray-700 text-sm font-bold mb-2">Destination</label>
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price?.toString() || ''}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="program" className="block text-gray-700 text-sm font-bold mb-2">Program</label>
        <textarea
          name="program"
          value={formData.program || ''}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
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

export default VoyageComponent;
