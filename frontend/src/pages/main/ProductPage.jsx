import { useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import Theme from './Theme';
import { CartContext } from '../Cart/CartContext';

const ProductPage = () => {
  const { state } = useLocation();
  const item = state;
  const { mode } = useContext(Theme);
  const { addToCart } = useContext(CartContext);

  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(item);
    setAdded(true);
  };

  return (
    <div
      className={`min-h-screen py-10 px-4 flex justify-center`}
    >
     <div
  className={`${
    mode ? 'bg-gray-600 text-white' : 'bg-white'
  } rounded-2xl shadow-xl p-6 grid md:grid-cols-2 md:max-w-6xl md:h-full md:w-full`}
>
  <div className="flex justify-center items-center">
    <img
      src={item.image}
      alt={item.name}
      className="max-w-40 object-cover rounded-lg"
    />
  </div>

        <div className={`${mode ? "text-gray-200" : "text-gray-600"} flex flex-col`}>
          <p className="text-3xl font-bold mb-2">{item.name}</p>

          <p className="text-xl font-semibold">
            <span className="line-through text-sm text-gray-400">
              M.R.P ₹ {(item.price * 3).toFixed(2)}

            </span>
            &nbsp;₹ {item.price}
          </p>

          <div className="mb-6">
            <p>{item.desc}</p>
            <p>Customer Ratings: {item.rating} ☆</p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`${
              added
                ? 'bg-green-500 cursor-not-allowed'
                : mode
                ? 'bg-violet-400 hover:bg-violet-500'
                : 'bg-blue-500 hover:bg-blue-600'
            } max-w-xs text-white py-3 px-6 rounded-xl text-lg transition duration-300`}
          >
            {added ? 'Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
