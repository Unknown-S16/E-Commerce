import { useNavigate } from 'react-router-dom';
import Main from '../main/Main';
import Theme from '../main/Theme';
import { useContext } from 'react';

export default function Section() {
  const navigate = useNavigate();
  const {mode} = useContext(Theme);

  return (
    <>
      <div
        className="flex mx-auto p-6 gap-[2%] justify-center items-stretch">
        {/* Mobile accessories Section */}
        <section
          onClick={() => navigate('/electronics')}
          className={` ${ mode ? "bg-gray-600 text-gray-300":"bg-violet-300 text-violet-600"} group  p-6 rounded-lg shadow-sm lg:flex select-none cursor-pointer w-1/2 hover:shadow-md transition-all  shadow-gray-500 `}
        >
          <div className="flex flex-col items-center justify-center ">
            <h2 className="text-xl md:text-3xl  font-bold  mb-4">
              Electronic Accessories
            </h2>
            <p className={`hidden lg:inline  text-center lg:text-lg ${mode? "text-gray-400":"text-gray-600" }`}>
              Stay charged. Stay connected. Whether it’s work or play, we’ve got
              the gear. Smart accessories for your smart lifestyle.
            </p>
            <button className={` ${mode? "bg-gray-700 ":"bg-gray-100"}  py-2 rounded-3xl  font-bold px-6 mt-8 cursor-pointer mb-[8%]`}>
              Explore
            </button>
          </div>
          <img className="imageRep h-" src="/mobile.png" alt="mobile" />
        </section>

        {/* Electronics Section */}
        <section
          onClick={() => navigate('/appliances')}
          className={` ${mode?"bg-gray-600 text-gray-300":"bg-blue-300 text-blue-600"}  p-6 rounded-lg shadow-sm lg:flex select-none cursor-pointer w-1/2 hover:shadow-md transition-all shadow-gray-500`}
        >
          <div className="flex flex-col justfy-center items-center">
            <h2 className="text-xl md:text-3xl font-bold  mb-4 ">
              Home Appliances
            </h2>
            <p className={`hidden lg:inline  text-center lg:text-lg ${mode? "text-gray-400":"text-gray-600" }`}>
              Turn your house into a smart home. From kitchen to laundry,
              experience effortless living. Reliable. Stylish. Made for your
              comfort
            </p>
            <button className={`${mode? "bg-gray-700":"bg-gray-100"}  py-2 rounded-3xl font-bold px-6 mt-8 cursor-pointer`}>
              Explore
            </button>
          </div>

          <img className=" imageRep" src="/electronic.png" alt="electronic" />
        </section>
      </div>
      <Main mode={mode} />
    </>
  );
}
