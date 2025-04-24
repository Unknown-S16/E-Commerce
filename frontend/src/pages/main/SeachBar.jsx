import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value.trim().toLowerCase());
  };

  return (
    <div className="flex mb-4 items-center justify-center">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md"
      />
    </div>
  );
}
