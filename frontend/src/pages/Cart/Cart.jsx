import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../Cart/CartContext';
import { ProductContext } from '../main/ProductContext';
import EmptyCart from './EmptyCart';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const { products: allProducts } = useContext(ProductContext);
  const navigate = useNavigate();
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  const category = cartItems.length > 0 ? cartItems[0].category : 'PC Components';

  useEffect(() => {
    const filtered = allProducts.filter((item) => item.category === category);
    setSuggestedProducts(filtered);
  }, [category, allProducts]);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div className="lg:flex">
      <div className="p-6 flex-[3] lg:max-w-[50%]">
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="border-t-2 border-gray-300 p-4 mb-2 flex items-start gap-[10%]"
            >
              <img src={item.image} alt={item.name} className="w-20 object-fit ml-[10%]" />

              <div className="flex-1">
                <h2 className="font-bold text-md mb-2">{item.name}</h2>
                <p>
                  Quantity:
                  <button
                    className="w-7 h-7 bg-gray-300 mx-2 rounded-lg text-lg font-bold text-gray-700 hover:bg-gray-400 transition"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    className="w-7 h-7 bg-gray-300 mx-2 rounded-lg text-lg font-bold text-gray-700 hover:bg-gray-400 transition"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                  <Trash2
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 ml-3 inline-flex cursor-pointer"
                  />
                </p>
                <p>Amount: ₹ {(item.quantity * item.price).toFixed(2)}</p>
              </div>
            </div>
          ))
        )}

        {cartItems.length !== 0 && (
          <div className="border-t-2 border-gray-300 text-right mt-3 pt-3 font-semibold text-lg">
            Total Amount : ₹ {calculateTotal().toFixed(2)}
          </div>
        )}
      </div>

      <div className="p-5 m-2 bg-violet-200 border border-gray-400 flex-[2] overflow-x-auto sm:overflow-x-auto lg:overflow-x-hidden">
        <h2 className="text-lg font-bold mb-3">You might also like:</h2>
        <div className="flex sm:flex-row lg:flex-col gap-[3%] sm:space-x-3 lg:space-y-3">
          {suggestedProducts.slice(0, 6).map((prod) => (
            <div
              key={prod.id}
              onClick={() => navigate('/product', { state: prod })}
              className="bg-white p-3 mb-2 rounded shadow min-w-[200px] lg:min-w-full cursor-pointer"
            >
              <img src={prod.image} alt={prod.name} className="w-full h-32 object-contain" />
              <h3 className="font-semibold">{prod.name}</h3>
              <p className="text-sm truncate">{prod.desc}</p>
              <p className="text-orange-600">₹ {prod.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
