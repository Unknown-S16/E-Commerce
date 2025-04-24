// src/context/ProductContext.jsx
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
 const API = "https://e-commerce-zqyw.onrender.com"
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};
