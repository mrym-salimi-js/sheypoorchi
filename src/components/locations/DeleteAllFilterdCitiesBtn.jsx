import { useContext } from 'react';
import { LocationContext } from './LocationBox';
import { BorderRoundedBtn } from '../globals/BorderRoundedBtn';

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
    <div className='w-auto h-auto px-3'>
      <BorderRoundedBtn
        borderColor={'border-[#84105C]'}
        bgColor={'bg-pink-50'}
        textColor={'text-[#84105C]'}
        textSize={'text-[0.7rem]'}
        label='حذف همه'
        handleAction={handleHideFilteredCities}
      />
    </div>
  );
}
