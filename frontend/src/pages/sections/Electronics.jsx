import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../main/ProductContext';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../main/SeachBar';

export default function Electronics() {
  const { products: allProducts } = useContext(ProductContext);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  const categories = ["PC Components", "Mobile", "Processor", "Accessories"];

  useEffect(() => {
    const filteredByCategory = allProducts.filter(item => categories.includes(item.category));
    setProducts(filteredByCategory);
    setFiltered(filteredByCategory);
  }, [allProducts]);

  const handleSearch = (query) => {
    if (!query) return setFiltered(products);
    const results = products.filter(p => p.name.toLowerCase().includes(query));
    setFiltered(results);
  };

  if (allProducts.length === 0) {
    return <p className="text-center mt-10 text-gray-600">Loading products...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Electronic Accessories</h2>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map(item => (
          <div key={item.id} onClick={() => navigate("/product", { state: item })} className="p-4 bg-white shadow-lg border border-gray-200 rounded-xl cursor-pointer">
            <img src={item.image} alt={item.name} className="w-full h-48 object-contain mb-4" />
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
