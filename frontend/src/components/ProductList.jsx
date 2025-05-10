import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      alert('Product deleted!');
      window.location.reload(); // Refresh
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const extractKeywords = (text) => {
    const stopWords = ['need', 'with', 'my', 'something', 'to', 'the', 'a', 'is', 'and'];
    return text.toLowerCase().split(/\s+/).filter(word => word && !stopWords.includes(word));
  };

  const filteredProducts = searchTerm.trim()
    ? products.filter((product) => {
        const keywords = extractKeywords(searchTerm);
        const combinedText = `${product.name} ${product.description}`.toLowerCase();
        return keywords.some(keyword => combinedText.includes(keyword));
      })
    : products;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {filteredProducts.map((product) => (
        <div
          key={product.product_id}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
        >
          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-600 text-sm mt-1">{product.description}</p>
            <p className="text-green-600 font-semibold mt-2 text-md">₹{product.price}</p>
            <button className="mt-4 w-full bg-red-500 hover:bg-red-600 text-black font-medium py-2 px-4 rounded">
              Delete
            </button>

          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
