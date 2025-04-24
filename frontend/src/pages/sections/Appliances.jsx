import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../main/ProductContext';
import SearchBar from '../main/SeachBar'; // update the path if needed

export default function Appliances() {
  const { products: allProducts } = useContext(ProductContext);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const categories = ["Television", "Audio", "Home Appliances"];

  useEffect(() => {
    const filtered = allProducts.filter(item =>
      categories.includes(item.category) &&
      (item.name.toLowerCase().includes(searchQuery) ||
       item.desc.toLowerCase().includes(searchQuery))
    );
    setProducts(filtered);
  }, [allProducts, searchQuery]);

  if (allProducts.length === 0) {
    return <p className="text-center mt-10 text-gray-600">Loading products...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Home Appliances</h2>
      <SearchBar onSearch={setSearchQuery} /> {/* Live search */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(item => (
          <div
            key={item.id}
            onClick={() => navigate('/product', { state: item })}
            className="p-4 bg-white shadow-lg border border-gray-200 rounded-xl cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600 text-sm truncate">{item.desc}</p>
            <p className="text-orange-600 font-bold mt-2">₹ {item.price}</p>
            <p className="text-sm text-gray-500">Rating: {item.rating} ☆</p>
          </div>
        ))}
      </div>
    </div>
  );
}
