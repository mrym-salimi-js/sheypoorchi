import { useContext } from 'react';
import { LocationContext } from './LocationBox';
import { BorderRoundedBtn } from '../globals/BorderRoundedBtn';
import { CloseMark } from '../globals/Icons';

export function FilteringCity() {
  const { setAllCheckedBoxes, allCheckedBoxes, setDeleteAllBtnClicked } =
    useContext(LocationContext);

  const handleHideFilteredCitiy = (cityName) => {
    const filtered = allCheckedBoxes.filter((item) => {
      if (item?.name !== cityName) {
        return item;
      }
    });
    setAllCheckedBoxes(filtered);
    setDeleteAllBtnClicked(true);
  };
  return (
    <div className='w-full overflow-scroll'>
      <ul className='flex gap-3 py-2 items-center justify-start'>
        {allCheckedBoxes?.map((city, index) => {
          return (
            city !== undefined && (
              <BorderRoundedBtn
                key={index}
                borderColor={'border-[#84105C]'}
                bgColor={'bg-pink-50'}
                textColor={'text-[#84105C]'}
                textSize={'text-[0.7rem]'}
                label={city?.name}
                handleAction={() =>
                  handleHideFilteredCitiy(city?.name, city.id)
                }
                icon={
                  <CloseMark
                    color={'#84105C'}
                    size={'size-5'}
                    strokeWidth={'2'}
                  />
                }
              />
            )
          );
        })}
      </ul>
    </div>
  );
}
