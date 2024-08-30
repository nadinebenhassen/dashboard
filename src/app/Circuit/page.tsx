"use client";

import React, { useState, useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";

// Define the type for Circuit
type Circuit = {
  id: number;
  title: string;
  description: string;
  duration: string;
  location: string;
  price: number;
  season: string;
  imageUrl: string;
};

// Initialize the Circuit data
const initialData: Circuit[] = [
  {
    id: 13,
    title: "Circuit Sud Tunisien",
    description: "À la découverte de Tozeur et le Sahara de Témainé",
    duration: "6 Jours/5 Nuits",
    location: "Douz, Tunisie",
    price: 1417,
    season: "Hiver 2024",
    imageUrl: "assets/images/images11.jpeg",
  },
  // Add more circuits if needed
];

export default function CircuitComponent() {
  const [data, setData] = useState<Circuit[]>(initialData);
  const [editingCircuit, setEditingCircuit] = useState<Circuit | null>(null);

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
        const { id } = row.original;
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
              onClick={() => handleDelete(id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const handleSave = (updatedCircuit: Circuit) => {
    if (updatedCircuit.id) {
      setData((prevData) =>
        prevData.map((circuit) =>
          circuit.id === updatedCircuit.id ? updatedCircuit : circuit
        )
      );
    } else {
      setData((prevData) => [
        ...prevData,
        { ...updatedCircuit, id: prevData.length + 1 },
      ]);
    }
    setEditingCircuit(null);
  };

  const handleAddNew = () => {
    setEditingCircuit({
      id: 0,
      title: "",
      description: "",
      duration: "",
      location: "",
      price: 0,
      season: "",
      imageUrl: "",
    });
  };

  const handleEdit = (circuit: Circuit) => {
    setEditingCircuit(circuit);
  };

  const handleDelete = (id: number) => {
    setData((prevData) =>
      prevData.filter((circuit) => circuit.id !== id)
    );
  };

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
