"use client";

import React, { useState } from "react";
import PageTitle from "@/components/PageTitle";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

// Define the type for Visa
type Visa = {
  id: number;
  title: string;
  location: string;
  hotel: string;
  rating: string;
  departureDate: string;
  returnDate: string;
  price: number;
  imageUrl: string;
};

// Sample data for Visa
const initialData: Visa[] = [
  {
    id: 1,
    title: "SOIRÉE REGENCY HAMMAMET",
    location: "Hammamet, Tunisie",
    hotel: "Hôtel Hammamet Serail",
    rating: "★★★★★",
    departureDate: "24 février 2024",
    returnDate: "26 février 2024",
    price: 90,
    imageUrl: "/assets/images/N1.jpeg",
  },
  // Add more Visa items if needed
];

export default function VisaComponent() {
  const [data, setData] = useState<Visa[]>(initialData);
  const [editingVisa, setEditingVisa] = useState<Visa | null>(null);

  const columns: ColumnDef<Visa>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "hotel",
      header: "Hotel",
    },
    {
      accessorKey: "rating",
      header: "Rating",
    },
    {
      accessorKey: "departureDate",
      header: "Departure Date",
    },
    {
      accessorKey: "returnDate",
      header: "Return Date",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => `${row.getValue("price")} TND`,
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

  const handleSave = (updatedVisa: Visa) => {
    if (updatedVisa.id) {
      setData((prevData) =>
        prevData.map((visa) => (visa.id === updatedVisa.id ? updatedVisa : visa))
      );
    } else {
      setData((prevData) => [
        ...prevData,
        { ...updatedVisa, id: prevData.length + 1 },
      ]);
    }
    setEditingVisa(null);
  };

  const handleAddNew = () => {
    setEditingVisa({
      id: 0,
      title: "",
      location: "",
      hotel: "",
      rating: "",
      departureDate: "",
      returnDate: "",
      price: 0,
      imageUrl: "",
    });
  };

  const handleEdit = (visa: Visa) => {
    setEditingVisa(visa);
  };

  const handleDelete = (id: number) => {
    setData((prevData) => prevData.filter((visa) => visa.id !== id));
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Visa Assistance" />
      <button
        onClick={handleAddNew}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 self-end"
      >
        Add Event
      </button>
      <DataTable columns={columns} data={data} />
      {editingVisa && (
        <EditForm
          visa={editingVisa}
          onSave={handleSave}
          onCancel={() => setEditingVisa(null)}
        />
      )}
     
    </div>
  );
}

type EditFormProps = {
  visa: Visa;
  onSave: (updatedVisa: Visa) => void;
  onCancel: () => void;
};

function EditForm({ visa, onSave, onCancel }: EditFormProps) {
  const [formData, setFormData] = useState<Visa>({ ...visa });

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
        <label className="block text-sm font-medium text-gray-700">Hotel</label>
        <input
          type="text"
          name="hotel"
          value={formData.hotel}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <input
          type="text"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Departure Date</label>
        <input
          type="text"
          name="departureDate"
          value={formData.departureDate}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Return Date</label>
        <input
          type="text"
          name="returnDate"
          value={formData.returnDate}
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
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
