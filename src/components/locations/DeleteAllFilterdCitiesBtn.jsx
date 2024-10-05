import { useContext } from 'react';
import { LocationContext } from './LocationBox';

export function DeleteAllFilterdCitiesBtn() {
  const {
    setAllCheckedBoxes,
    setCheck,
    setDeleteAllBtnClicked,
    setRemovedAllLocs,
  } = useContext(LocationContext);
  const handleHideFilteredCities = () => {
    setDeleteAllBtnClicked(true);
    setCheck([]);
    setAllCheckedBoxes([]);
    setRemovedAllLocs(true);
  };

  return (
    <div className='w-24 h-auto p-3  flex items-center justify-center gap-3 rounded-full bottom-2  bg-pink-50 cursor-pointer'>
      <p
        onClick={handleHideFilteredCities}
        className='text-[12px] text-[#84105C] '
      >
        حذف همه
      </p>
    </div>
  );
}
