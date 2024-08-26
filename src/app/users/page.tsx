// /**
//  * eslint-disable @next/next/no-img-element
//  *
//  * @format
//  */

// /** @format */
// "use client";

// import { DataTable } from "@/components/DataTable";
// import { ColumnDef } from "@tanstack/react-table";
// import React from "react";
// import PageTitle from "@/components/PageTitle";

// type Props = {};
// type Payment = {
//   name: string;
//   email: string;
//   lastOrder: string;
//   method: string;
// };

// const columns: ColumnDef<Payment>[] = [
//   {
//     accessorKey: "name",
//     header: "Name",
//     cell: ({ row }) => {
//       return (
//         <div className="flex gap-2 items-center">
//           <img
//             className="h-10 w-10"
//             src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue(
//               "name"
//             )}`}
//             alt="user-image"
//           />
//           <p>{row.getValue("name")} </p>
//         </div>
//       );
//     }
//   },
//   {
//     accessorKey: "email",
//     header: "Email"
//   },
//   {
//     accessorKey: "lastOrder",
//     header: "Last Order"
//   },
//   {
//     accessorKey: "method",
//     header: "Method"
//   }
// ];

// const data: Payment[] = [
//   {
//     name: "John Doe",
//     email: "john@example.com",
//     lastOrder: "2023-01-01",
//     method: "Credit Card"
//   },
//   {
//     name: "Alice Smith",
//     email: "alice@example.com",
//     lastOrder: "2023-02-15",
//     method: "PayPal"
//   },
//   {
//     name: "Bob Johnson",
//     email: "bob@example.com",
//     lastOrder: "2023-03-20",
//     method: "Stripe"
//   },
//   {
//     name: "Emma Brown",
//     email: "emma@example.com",
//     lastOrder: "2023-04-10",
//     method: "Venmo"
//   },
//   {
//     name: "Michael Davis",
//     email: "michael@example.com",
//     lastOrder: "2023-05-05",
//     method: "Cash"
//   },
//   {
//     name: "Sophia Wilson",
//     email: "sophia@example.com",
//     lastOrder: "2023-06-18",
//     method: "Bank Transfer"
//   },
//   {
//     name: "Liam Garcia",
//     email: "liam@example.com",
//     lastOrder: "2023-07-22",
//     method: "Payoneer"
//   },
//   {
//     name: "Olivia Martinez",
//     email: "olivia@example.com",
//     lastOrder: "2023-08-30",
//     method: "Apple Pay"
//   },
//   {
//     name: "Noah Rodriguez",
//     email: "noah@example.com",
//     lastOrder: "2023-09-12",
//     method: "Google Pay"
//   },
//   {
//     name: "Ava Lopez",
//     email: "ava@example.com",
//     lastOrder: "2023-10-25",
//     method: "Cryptocurrency"
//   },
//   {
//     name: "Elijah Hernandez",
//     email: "elijah@example.com",
//     lastOrder: "2023-11-05",
//     method: "Alipay"
//   },
//   {
//     name: "Mia Gonzalez",
//     email: "mia@example.com",
//     lastOrder: "2023-12-08",
//     method: "WeChat Pay"
//   },
//   {
//     name: "James Perez",
//     email: "james@example.com",
//     lastOrder: "2024-01-18",
//     method: "Square Cash"
//   },
//   {
//     name: "Charlotte Carter",
//     email: "charlotte@example.com",
//     lastOrder: "2024-02-22",
//     method: "Zelle"
//   },
//   {
//     name: "Benjamin Taylor",
//     email: "benjamin@example.com",
//     lastOrder: "2024-03-30",
//     method: "Stripe"
//   }
// ];

// export default function UsersPage({}: Props) {
//   return (
//     <div className="flex flex-col gap-5  w-full">
//       <PageTitle title="Users" />
//       <DataTable columns={columns} data={data} />
//     </div>
//   );
// }
/** @format */

"use client";

import React, { useState } from "react";
import PageTitle from "@/components/PageTitle";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";

// Define the User type
type User = {
  id: number;
  username: string;
  email: string;
  role: string;
  lastLogin: string;
  modepasses: string; // Example of historical information
};

// Sample initial data
const initialData: User[] = [
  { id: 1, username: "admin", email: "admin@example.com", role: "Admin", lastLogin: "2024-08-20", modepasses: "Passed: 10, Failed: 2" },
  { id: 2, username: "assistant", email: "assistant@example.com", role: "Assistant", lastLogin: "2024-08-19", modepasses: "Passed: 5, Failed: 1" },
  // Add more sample users here
];

export default function UsersComponent() {
  const [data, setData] = useState<User[]>(initialData);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Define columns for the DataTable
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
    },
    {
      accessorKey: "modepasses",
      header: "Modepasses",
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

  // Handle adding a new user
  const handleAddNew = () => {
    setEditingUser({ id: 0, username: "", email: "", role: "Assistant", lastLogin: "", modepasses: "" });
  };

  // Handle editing an existing user
  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  // Handle deleting a user
  const handleDelete = (id: number) => {
    setData((prevData) => prevData.filter((user) => user.id !== id));
  };

  // Handle saving changes to a user
  const handleSave = (updatedUser: User) => {
    if (updatedUser.id) {
      setData((prevData) =>
        prevData.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
    } else {
      setData((prevData) => [
        ...prevData,
        { ...updatedUser, id: prevData.length + 1 },
      ]);
    }
    setEditingUser(null);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Users" />
      <button
        onClick={handleAddNew}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 self-end"
      >
        Add User
      </button>
      <DataTable columns={columns} data={data} />
      {editingUser && (
        <EditForm
          user={editingUser}
          onSave={handleSave}
          onCancel={() => setEditingUser(null)}
        />
      )}
    </div>
  );
}

// Define props for the EditForm component
type EditFormProps = {
  user: User;
  onSave: (updatedUser: User) => void;
  onCancel: () => void;
};

// Define the EditForm component
function EditForm({ user, onSave, onCancel }: EditFormProps) {
  const [formData, setFormData] = useState<User>({ ...user });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="Admin">Admin</option>
          <option value="Assistant">Assistant</option>
          {/* Add other roles if necessary */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Last Login</label>
        <input
          type="date"
          name="lastLogin"
          value={formData.lastLogin}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Modepasses</label>
        <input
          type="text"
          name="modepasses"
          value={formData.modepasses}
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
