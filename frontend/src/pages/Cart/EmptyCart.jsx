import { ShoppingCart } from 'lucide-react';

const EmptyCart = () => {
  return (
    
      <div className='text-gray-300 text-sm w-full md:text-xl font-bold border border-3 p-10 flex flex-col items-center gap-6 rounded-xl'>
        <ShoppingCart  className="w-full h-full max-w-50 "/>
        <p>No items in cart</p>
      </div>
      
  
  );
};
export default EmptyCart;
