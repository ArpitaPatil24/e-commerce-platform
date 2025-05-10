import React, { useState } from "react";
import ProductSubmission from "./components/ProductSubmission";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("submit"); // 'submit' or 'view'

  const handleProductSubmitted = (newProduct) => {
    setProducts([...products, newProduct]);
    setActiveTab("view"); // Automatically switch to 'My Products' after submit
  };

  return (
    <div className="bg-50 min-h-screen px-6 py-8 w-350 ml-14">
      <div className="max-w-screen-xl mx-auto">
        <Header />
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`px-6 py-3 rounded ${
              activeTab === "submit" ? "bg-blue-600 text-black" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("submit")}
          >
            Product Submission
          </button>
          <button
            className={`px-6 py-3 rounded ${
              activeTab === "view" ? "bg-blue-600 text-black" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("view")}
          >
            My Products
          </button>
        </div>
        <div className="w-full max-w-screen-xl mx-auto">
          {activeTab === "submit" && (
            <ProductSubmission
              setActiveTab={setActiveTab}
              onProductSubmitted={handleProductSubmitted}
            />
          )}

          {activeTab === "view" && (
            <>
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <ProductList searchTerm={searchTerm} />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
