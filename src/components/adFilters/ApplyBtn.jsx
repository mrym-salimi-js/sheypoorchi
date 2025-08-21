import { useContext } from 'react';
import { CategoryPageContext } from '../../components/CategoryPageDetails';

export default function ApplyBtn() {
  const { setFilterFormDisplay } = useContext(CategoryPageContext);

  const handleFilterFormDisplay = () => {
    setFilterFormDisplay('opacity-0 invisible');
  };

  return (
    <div
      onClick={handleFilterFormDisplay}
      className='w-full h-auto absolute bottom-0 p-3 flex justify-center items-center'
    >
      <button
        onClick={handleFilterFormDisplay}
        type='button'
        className='w-full h-full bg-[#84105C] py-4 rounded-full flex items-center justify-around  hover:opacity-[0.9] shadow-md focus:outline-none'
      >
        <p className='w-[90%] text-sm text-white'>{'اعمال فیلتر'}</p>
      </button>

      {/* <span className='w-full h-full flex justify-center items-center bg-[#84105C] text-white cursor-pointer rounded-lg hover:opacity-[0.7] '>
        اعمال فیلتر
      </span> */}
    </div>
  );
}
