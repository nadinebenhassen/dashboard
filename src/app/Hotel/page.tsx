"use client";

import React, { useState } from "react";
import PageTitle from "@/components/PageTitle";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";

type Hotel = {
  id: number;
  title: string;
  location: string;
  price: string;
  description: string;
  image: string;
};

const initialData: Hotel[] = [
  { id: 1, title: "Hotel des Dunes", location: "Sousse, Tunisie", price: "150 TND", description: "Un hôtel confortable à Sousse avec vue sur la mer.", image: "/assets/images/hotel1.jpeg" },
  { id: 2, title: "Grand Palace Hotel", location: "Paris, France", price: "300 EUR", description: "Un hôtel de luxe au cœur de Paris.", image: "/assets/images/hotel2.jpeg" },
  { id: 3, title: "Beachfront Resort", location: "Djerba, Tunisie", price: "200 TND", description: "Un complexe tout inclus avec accès direct à la plage.", image: "/assets/images/hotel3.jpeg" },
  { id: 4, title: "Mountain Retreat", location: "Tunis, Tunisie", price: "180 TND", description: "Un hôtel tranquille situé dans les montagnes.", image: "/assets/images/hotel4.jpeg" },
];

export default function HotelComponent() {
  const columns: ColumnDef<Hotel>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "price",
      header: "Price",
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
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <img src={row.getValue("image")} alt={row.getValue("title")} className="w-32 h-20 object-cover"/>
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

  const [data, setData] = useState<Hotel[]>(initialData);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);

  const handleSave = (updatedHotel: Hotel) => {
    if (updatedHotel.id) {
      setData((prevData) =>
        prevData.map((hotel) =>
          hotel.id === updatedHotel.id ? updatedHotel : hotel
        )
      );
    } else {
      setData((prevData) => [
        ...prevData,
        { ...updatedHotel, id: prevData.length + 1 },
      ]);
    }
    setEditingHotel(null);
  };

  const handleAddNew = () => {
    setEditingHotel({ id: 0, title: "", location: "", price: "", description: "", image: "" });
  };

  const handleEdit = (hotel: Hotel) => {
    setEditingHotel(hotel);
  };

  const handleDelete = (id: number) => {
    setData((prevData) =>
      prevData.filter((hotel) => hotel.id !== id)
    );
  };

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
}

type EditFormProps = {
  hotel: Hotel;
  onSave: (updatedHotel: Hotel) => void;
  onCancel: () => void;
};

function EditForm({ hotel, onSave, onCancel }: EditFormProps) {
  const [formData, setFormData] = useState<Hotel>({ ...hotel });

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
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="text"
          name="price"
          value={formData.price}
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
          name="image"
          value={formData.image}
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
