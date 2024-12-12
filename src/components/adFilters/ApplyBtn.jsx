import { useContext } from 'react';
import { HomeContext } from '../../pages/Home';

export default function ApplyBtn() {
  const { setFilterFormDisplay } = useContext(HomeContext);

  const handleFilterFormDisplay = () => {
    setFilterFormDisplay('opacity-0 invisible');
  };

  return (
    <div
      onClick={handleFilterFormDisplay}
      className='w-full h-20 absolute bottom-0 p-3 flex justify-center items-center'
    >
      <span className='w-full h-full flex justify-center items-center bg-[#84105C] text-white cursor-pointer rounded-lg hover:opacity-[0.7] '>
        اعمال فیلتر
      </span>
    </div>
  );
}
