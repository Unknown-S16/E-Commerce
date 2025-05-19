import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Theme, { ThemeProvider } from './pages/main/Theme';
import { CartProvider } from './pages/Cart/CartContext';
import NavBar from './pages/NavBar';
import Cluster from './pages/header/Cluster';
import Appliances from './pages/sections/Appliances';
import Electronics from './pages/sections/Electronics';
import Credits from './pages/footer/Credits';
import LoginPage from './pages/Authentication/Login';
import ProductPage from './pages/main/ProductPage';
import CartPage from './pages/Cart/Cart';
import AuthProvider from './pages/Authentication/AuthContext';
import Profile from './pages/main/Profile';
import { ProductProvider } from "./pages/main/ProductContext";
import { useContext } from 'react';

function AppContent() {
  const { mode } = useContext(Theme);
  const backGroundColor = mode ? "bg-gray-500" : "bg-violet-100";

  return (
    <div className={`flex flex-col min-h-screen ${backGroundColor}`}>
      <NavBar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Cluster />} />
          <Route path="/home" element={<Cluster />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/appliances" element={<Appliances />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Credits />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <AuthProvider>
            <ProductProvider>
              <AppContent />
            </ProductProvider>
          </AuthProvider>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}
