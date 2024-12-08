import Head from './Head';
import { MainFields } from './MainFields';
import ApplyBtn from './ApplyBtn';
import { useContext } from 'react';
import { HomeContext } from '../../pages/Home';

export default function AdFiltersBox() {
  const { filterFormDisplay, setFilterFormDisplay } = useContext(HomeContext);
  const handleFilterFormDisplay = (event) => {
    filterFormDisplay !== 'hidden' &&
      event.target.id === 'filter-box' &&
      setFilterFormDisplay('hidden');
  };
  return (
    <div
      onClick={handleFilterFormDisplay}
      id={'filter-box'}
      className={`w-full h-full flex items-center justify-center fixed top-0 right-0 z-[10000] bg-[#2222228a] ${filterFormDisplay}`}
    >
      <div className='w-auto md:w-[50%] lg:w-[40%] xl:w-[30%] h-[100%] bg-white fixed right-0 '>
        <div className='w-full h-[99%] flex flex-col gap-5 overflow-y-scroll'>
          {/* Filter Head */}
          <Head />

          {/* Filter Fields */}
          <MainFields />

          {/* Add Filter Btn */}
          <ApplyBtn />
        </div>
      </div>
    </div>
  );
}
