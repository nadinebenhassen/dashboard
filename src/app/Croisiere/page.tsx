"use client";

import React, { useState } from "react";
import Image from "next/image";
import PageTitle from "@/components/PageTitle";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";

type Croisiere = {
  id: number;
  title: string;
  ship: string;
  rating: string;
  departureDate: string;
  returnDate: string;
  price: number;
  imageUrl: string;
};

const initialData: Croisiere[] = [
  {
    id: 1,
    title: "Croisière Méditerranée",
    ship: "Méditerranée Explorer",
    rating: "★★★★★",
    departureDate: "15 juin 2024",
    returnDate: "25 juin 2024",
    price: 1200,
    imageUrl: "/assets/images/ColinLloydJxyph6ZgbtAunsplash14.jpeg",
  },
  // Add more Croisiere items if needed
];

export default function CroisiereComponent() {
  const [data, setData] = useState<Croisiere[]>(initialData);
  const [editingCroisiere, setEditingCroisiere] = useState<Croisiere | null>(null);

  const columns: ColumnDef<Croisiere>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "ship",
      header: "Ship",
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
      cell: ({ row }) => `${row.getValue("price")} DT`,
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

  const handleSave = (updatedCroisiere: Croisiere) => {
    if (updatedCroisiere.id) {
      setData((prevData) =>
        prevData.map((croisiere) =>
          croisiere.id === updatedCroisiere.id ? updatedCroisiere : croisiere
        )
      );
    } else {
      setData((prevData) => [
        ...prevData,
        { ...updatedCroisiere, id: prevData.length + 1 },
      ]);
    }
    setEditingCroisiere(null);
  };

  const handleAddNew = () => {
    setEditingCroisiere({
      id: 0,
      title: "",
      ship: "",
      rating: "",
      departureDate: "",
      returnDate: "",
      price: 0,
      imageUrl: "",
    });
  };

  const handleEdit = (croisiere: Croisiere) => {
    setEditingCroisiere(croisiere);
  };

  const handleDelete = (id: number) => {
    setData((prevData) => prevData.filter((croisiere) => croisiere.id !== id));
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Croisière" />
      <button
        onClick={handleAddNew}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 self-end"
      >
        Add Croisière
      </button>
      <DataTable columns={columns} data={data} />
      {editingCroisiere && (
        <EditForm
          croisiere={editingCroisiere}
          onSave={handleSave}
          onCancel={() => setEditingCroisiere(null)}
        />
      )}
     
    </div>
  );
}

type EditFormProps = {
  croisiere: Croisiere;
  onSave: (updatedCroisiere: Croisiere) => void;
  onCancel: () => void;
};

function EditForm({ croisiere, onSave, onCancel }: EditFormProps) {
  const [formData, setFormData] = useState<Croisiere>({ ...croisiere });

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
        <label className="block text-sm font-medium text-gray-700">Ship</label>
        <input
          type="text"
          name="ship"
          value={formData.ship}
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
