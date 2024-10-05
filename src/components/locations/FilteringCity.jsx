import { useContext } from 'react';
import { LocationContext } from './LocationBox';

export function FilteringCity() {
  const { setAllCheckedBoxes, allCheckedBoxes, setDeleteAllBtnClicked } =
    useContext(LocationContext);

  const handleHideFilteredCitiy = (cityName) => {
    const filtered = allCheckedBoxes.filter((item) => {
      if (item.name !== cityName) {
        return item;
      }
    });
    setAllCheckedBoxes(filtered);
    setDeleteAllBtnClicked(true);
  };

  return (
    <div className='w-full overflow-scroll'>
      <ul className='flex gap-3 items-center justify-start'>
        {allCheckedBoxes?.map((city, index) => {
          return (
            <li
              className='w-auto h-auto p-3 flex items-center justify-between gap-3 rounded-full bottom-2  bg-pink-50'
              key={index}
            >
              <p className='text-[11px] text-[#84105C] '>{city.name}</p>
              <svg
                onClick={() => handleHideFilteredCitiy(city.name, city.id)}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#501a3d'
                className='size-4 cursor-pointer'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18 18 6M6 6l12 12'
                />
              </svg>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
