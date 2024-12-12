import Head from './Head';
import { MainFields } from './MainFields';
import ApplyBtn from './ApplyBtn';
import { useContext } from 'react';
import { HomeContext } from '../../pages/Home';

export default function AdFiltersBox() {
  const { filterFormDisplay, setFilterFormDisplay } = useContext(HomeContext);
  const handleFilterFormDisplay = (event) => {
    !filterFormDisplay.includes('invisible') &&
      event.target.id === 'filter-box' &&
      setFilterFormDisplay('opacity-0 invisible');
  };
  return (
    <>
      {/* Back Dark */}
      <div
        className={`w-full h-full flex items-center justify-center fixed top-0 right-0 z-[10000] bg-[#00000073]  transition-opacity duration-1000 ease-in-out  ${filterFormDisplay}`}
      ></div>
      {/* Filter Box */}
      <div
        onClick={handleFilterFormDisplay}
        id='filter-box'
        className={`w-full h-full  flex flex-col items-start justify-center fixed top-0 right-0  transition-all duration-1000 ease-in-out z-[1000000]  ${
          !filterFormDisplay.includes('invisible')
            ? `translate-x-0`
            : `translate-x-full`
        }    `}
      >
        <div
          className={`w-auto md:w-[50%] lg:w-[40%] xl:w-[30%] relative right-0 h-[100%] bg-white z-[100000] `}
        >
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
    </>
  );
}
