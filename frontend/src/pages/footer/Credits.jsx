import Theme from '../main/Theme';
import { useContext } from 'react';

const Credits = () => {
    const { mode } = useContext(Theme);

  return (
    <>
      <div
        className={`${
          mode ? 'bg-gray-800 text-white' : 'bg-violet-300 text-black'
        } p-4 text-center border-t-1 border-gray-200 w-full   `}
      >
        <p className="text-sm font-light mb-1">
          Copyright © 2025 E-Shopper. All Rights Reserved.
        </p>
        <h5 className="text-xs font-light ">
          Designed & Developed by Sharath kishan
        </h5>
      </div>
    </>
  );
};
export default Credits;
