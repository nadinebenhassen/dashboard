"use client";

import React, { useCallback, useState , useEffect} from "react";
import PageTitle from "@/components/PageTitle";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";

type Omra = {
  id: number;
  title: string;
  date: string;
  price: string;
  description: string;
  image:string;
};

const initialData: Omra[] = [
  { id: 1, title: "Omra Janvier 2024", date: "2024-01-15", price: "3000 TND", description: "Une omra inoubliable au départ de Tunis avec un programme complet incluant hébergement, visites, et plus encore.",image: "/assets/images/hotel1.jpeg" },
  { id: 2, title: "Omra Février 2024", date: "2024-02-10", price: "3200 TND", description: "Rejoignez-nous pour une omra exceptionnelle avec un confort optimal et des guides expérimentés.", image: "/assets/images/hotel1.jpeg" },
  { id: 3, title: "Omra Mars 2024", date: "2024-03-05", price: "3100 TND", description: "Vivez une omra spirituelle avec un itinéraire soigneusement préparé pour votre bien-être.", image: "/assets/images/hotel1.jpeg" },
  { id: 4, title: "Omra Avril 2024", date: "2024-04-20", price: "3500 TND", description: "Profitez d'une omra spéciale durant le mois de Ramadan, avec des activités religieuses enrichissantes.", image: "/assets/images/hotel1.jpeg" },
];




export default function OmraComponent() {
  const columns: ColumnDef<Omra>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "date",
      header: "Date",
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
  const [data, setData] = useState<Omra[]>(initialData);
  const [editingOmra, setEditingOmra] = useState<Omra | null>(null);

  const handleSave = (updatedOmra: Omra) => {
    if (updatedOmra.id) {
      setData((prevData) =>
        prevData.map((omra) =>
          omra.id === updatedOmra.id ? updatedOmra : omra
        )
      );
    } else {
      setData((prevData) => [
        ...prevData,
        { ...updatedOmra, id: prevData.length + 1 },
      ]);
    }
    setEditingOmra(null);
  };

  const handleAddNew = () => {
    setEditingOmra({ id: 0, title: "", date: "", price: "", description: "", image:""});
  };

  const handleEdit = (omra: Omra) => {
    setEditingOmra(omra);
  };

  const handleDelete = (id: number) => {
    setData((prevData) =>
      prevData.filter((omra) => omra.id !== id)
    );
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Omra" />
      <button
        onClick={handleAddNew}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 self-end"
      >
        Add Omra
      </button>
      <DataTable columns={columns} data={data} />
      {editingOmra && (
        <EditForm
          omra={editingOmra}
          onSave={handleSave}
          onCancel={() => setEditingOmra(null)}
        />
      )}
    </div>
  );
}

type EditFormProps = {
  omra: Omra;
  onSave: (updatedOmra: Omra) => void;
  onCancel: () => void;
};

function EditForm({ omra, onSave, onCancel }: EditFormProps) {
  const [formData, setFormData] = useState<Omra>({ ...omra });

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
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
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
