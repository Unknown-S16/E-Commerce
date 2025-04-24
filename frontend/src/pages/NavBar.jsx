import { useState, useContext } from 'react';
import {
  CircleUser,
  ShoppingCart,
  Sun,
  Moon,
  X,
  Menu,
  ShoppingBag,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Theme from './main/Theme';
import { CartContext } from './Cart/CartContext';
import { AuthContext } from './Authentication/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mode, setMode } = useContext(Theme);
  const { cartItems } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);

  const current = mode
    ? 'bg-gray-900 md:bg-transparent text-gray-400 font-bold'
    : 'text-gray-700 md:bg-transparent bg-white font-bold';
  const hoverEffect = mode
    ? 'hover:text-white hover:border-white transistion-all ease-in-out duration-100 border-transparent border-l-4 pl-1.5'
    : 'hover:text-black hover:border-black transistion-all ease-in-out duration-100 border-transparent border-l-4 pl-1.5';
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/login');
  };
  const goToHome = () => {
    navigate('/home');
  };
  const goToCart = () => {
    navigate('/cart');
  };
  const Topics = () => {
    return (
      <>
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className={`${current} ${hoverEffect} `}
        >
          Home
        </Link>
        <Link
          to="/appliances"
          onClick={() => setIsOpen(false)}
          className={`${current} ${hoverEffect} `}
        >
          Appliances
        </Link>
        <Link
          to="/electronics"
          onClick={() => setIsOpen(false)}
          className={`${current} ${hoverEffect} `}
        >
          Electronics
        </Link>
      </>
    );
  };

  const ToggleTheme = () => {
    setMode(!mode);
  };
  return (
    <nav
      className={`${
        mode ? 'bg-gray-800 text-white' : 'bg-violet-300'
      } shadow-md p-2`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex  items-center text-xl  font-semibold font-serif">
          <ShoppingBag size={30} />
          <button onClick={goToHome} className="hide400 ">
            E-Shopper
          </button>
        </div>

        <div className={`hidden md:flex space-x-6`}>
          <Topics />
        </div>

        <div className="flex gap-2">
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
          <button
            onClick={ToggleTheme}
            className={`flex gap-1 items-center rounded-2xl ${
              mode ? 'bg-gray-700' : 'bg-gray-200'
            } px-4 m-0`}
          >
            {' '}
            {mode ? (
              <>
                <Moon size={15} />
              </>
            ) : (
              <>
                <Sun size={15} />
              </>
            )}
          </button>
          <button onClick={goToCart} className="relative">
            <ShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute top-0 -right-3 bg-blue-400 text-white text-xs font-bold px-1 py-0.5 rounded-full leading-none">
                {cartItems.length}
              </span>
            )}
          </button>

          {currentUser ? (
            <Link to="/profile" className="ml-4">
              <img
                src={currentUser.photoURL}
                alt="profile"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            </Link>
          ) : (
            <button
              onClick={goToLogin}
              className={`${
                mode
                  ? 'bg-violet-400 text-violet-800'
                  : 'bg-violet-400 text-white'
              } px-4 py-2 rounded-xl gap-2 ml-5 flex items-center `}
            >
              <CircleUser size={26} />
              <span className="hidden md:inline">Sign In</span>
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className={`absolute top-16 left-0 w-full p-4 shadow-lg z-40 flex flex-col space-y-4 ${current} md:hidden`}
        >
          <Topics />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
