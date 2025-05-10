const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden transition-transform hover:scale-105">
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{product.productName}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <p className="text-green-600 font-bold text-lg">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
