"use client";

import React, { useState, useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { getCircuits, updateCircuit, createCircuit, deleteCircuit, getCircuitByName } from "@/services/CircuitService";
import axios from "axios";

// Define the type for Circuit
type Circuit = {
 
  title: string;
  description: string;
  duration: string;
  location: string;
  price: string;
  season: string;
  imageUrl: string[];
};

export default function CircuitComponent() {
  const [data, setData] = useState<Circuit[]>([]);
  const [editingCircuit, setEditingCircuit] = useState<Circuit | null>(null);

  useEffect(() => {
    loadCircuit();
  }, []);

  const loadCircuit = async () => {
    try {
      const response = await axios.get('http://localhost:3002/circuits'); // Adjust endpoint as necessary
      setData(response.data);
    } catch (error) {
      console.error('Error loading circuits', error);
    }
  };
console.log(data)
const handleSave = async (circuit: Circuit) => {
  
    if (circuit.title) {
      // Update existing hotel
      await axios.put(`http://localhost:3002/circuits/${circuit.title}`, circuit);
    } else {
      // Add new hotel
      await axios.post('http://localhost:3002/circuits', circuit);
    }  
    loadCircuit(); // Reload data after save
    setEditingCircuit(null);
  

  

};

const handleAddNew = () => {
  setEditingCircuit({
  title: '',
  description: '',
  duration: '',
  location: '',
  price: '',
  season: '',
  imageUrl: [''],
  });
};

const handleEdit = (circuit: Circuit) => {
  setEditingCircuit(circuit);
};
const handleDelete = async (title: string) => {
   
  try {
    // Supposons que vous ayez une fonction pour récupérer un hôtel par son nom
    const circuit = await getCircuitByName(title);

    if (circuit && circuit.title) {
      // Suppression de l'hôtel via son ID
      await deleteCircuit(title);
      console.log("Circuit deleted successfully");
      // Vous pouvez mettre à jour l'interface utilisateur ici, par exemple
    } else {
      console.log("Circuit not found");
    }
  } catch (error) {
    console.error("Error deleting Circuit:", error);
  }
};

  const columns: ColumnDef<Circuit>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "duration",
      header: "Duration",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => `$${row.getValue("price")}`,
    },
    {
      accessorKey: "season",
      header: "Season",
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="text-ellipsis overflow-hidden">
          {row.getValue("description")}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const { title } = row.original;
        return (
          <div className="flex gap-2">
            <button
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleEdit(row.original)}
            >
              Edit
            </button>
            <button
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => handleDelete(title)}
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
      <PageTitle title="Circuit" />
      <button
        onClick={handleAddNew}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 self-end"
      >
        Add Circuit
      </button>
      <DataTable columns={columns} data={data} />
      {editingCircuit && (
        <EditForm
          circuit={editingCircuit}
          onSave={handleSave}
          onCancel={() => setEditingCircuit(null)}
        />
      )}
    </div>
  );
}

type EditFormProps = {
  circuit: Circuit;
  onSave: (updatedCircuit: Circuit) => void;
  onCancel: () => void;
};

function EditForm({ circuit, onSave, onCancel }: EditFormProps) {
  const [formData, setFormData] = useState<Circuit>({ ...circuit });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="p-4 bg-gray-100 rounded-lg" onSubmit={handleSubmit}>
      {/* Form fields */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Duration</label>
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Season</label>
        <input
          type="text"
          name="season"
          value={formData.season}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
