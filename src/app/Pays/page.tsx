"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface Country {
  _id: string;
  name: string;
  image: string;
}

const AddCountryForm = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(""); // Corrected 'description' to 'image'
  const [countries, setCountries] = useState<Country[]>([]);

  // Fetch countries from the server
  const fetchCountries = async () => {
    try {
      const response = await axios.get("http://localhost:3002/Countries");
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries", error);
    }
  };

  // Fetch countries when the component is mounted
  useEffect(() => {
    fetchCountries();
  }, []);

  // Add a country
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3002/Countries", { name, image });
      alert("Country added successfully");
      setName("");  // Clear the input fields
      setImage("");
      fetchCountries(); // Refresh the country list
    } catch (error) {
      console.error("Error adding country", error);
    }
  };

  // Delete a country
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3002/Countries/${id}`);
      alert("Country deleted successfully");
      fetchCountries(); // Refresh the country list after deletion
    } catch (error) {
      console.error("Error deleting country", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Country</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Country Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter country name"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
            Image URL:
          </label>
          <input
            id="image"
            type="text"
            value={image} // Corrected from description to image
            onChange={(e) => setImage(e.target.value)} // Corrected setDescription to setImage
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter image URL"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Country
          </button>
        </div>
      </form>

      <h2 className="text-xl font-bold mb-4 text-center">List of Countries</h2>
      <ul className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {countries.map((country) => (
          <li key={country._id} className="flex justify-between items-center border-b py-2">
            <div>
              <p className="text-lg font-semibold">{country.name}</p>
              <p className="text-gray-600">{country.image}</p>
            </div>
            <button
              onClick={() => handleDelete(country._id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddCountryForm;
