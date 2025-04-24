import { useRef, useContext, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Theme from './Theme';
import { ProductContext } from '../main/ProductContext';

export default function Main() {
  const { products } = useContext(ProductContext);
  const { mode } = useContext(Theme);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const scrollRefs = useRef({});
  const navigate = useNavigate();

  // Group products by category
  const categories = {};
  products.forEach((item) => {
    if (!categories[item.category]) {
      categories[item.category] = [];
    }
    categories[item.category].push(item);
  });

  // Scroll function
  const scroll = (category, direction) => {
    const container = scrollRefs.current[category];
    if (container) {
      container.scrollBy({ left: direction * 400, behavior: 'smooth' });
    }
  };

  return (
    <div className={`${mode ? 'bg-gray-500' : 'bg-violet-100'} w-full`}>
      <h1 className={`text-xl font-bold p-2 ${mode ? 'bg-gray-400' : 'bg-purple-300'} text-white`}>
        What's Special
      </h1>

      {Object.keys(categories).map((cat) => (
        <div
          key={cat}
          className="relative mb-8"
          onMouseEnter={() => setHoveredCategory(cat)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <div
            ref={(el) => (scrollRefs.current[cat] = el)}
            className="flex overflow-x-auto gap-4 px-4 py-2 no-scrollbar scroll-smooth"
          >
            {categories[cat].map((item) => (
              <div
                key={item.id}
                className="min-w-[200px] bg-white border border-gray-200 rounded-lg p-3 shadow-md mt-6"
                onClick={() => navigate('/product', { state: item })}
              >
                <img src={item.image} alt={item.name} className="h-40 w-full object-contain" />
                <h3 className="font-bold mt-2 text-gray-600 truncate">{item.name}</h3>
                <p className="text-sm truncate text-gray-600">{item.desc}</p>
                <p className="text-blue-500 font-bold">₹ {item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>

          {hoveredCategory === cat && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md"
                onClick={() => scroll(cat, -1)}
              >
                <ChevronLeft />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md"
                onClick={() => scroll(cat, 1)}
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
