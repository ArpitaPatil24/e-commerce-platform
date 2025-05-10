import React, { useState } from "react";
import axios from "axios";

const ProductSubmission = ({ onProductSubmitted }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:5000/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert("Product submitted!");
      setName('');
      setPrice('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  return (
    <div className="w-screen max-w-screen-xl mx-auto justify-center items-center">
      <h2 className="text-2xl font-bold mb-4">Submit a Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-md"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 border rounded-md"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded-md"
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border rounded-md"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-black font-semibold py-2 px-4 rounded shadow justify-center">
  Submit Product
</button>

      </form>
    </div>
  );
};

export default ProductSubmission;
