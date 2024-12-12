import { useContext } from 'react';
import { LocationContext } from './LocationBox';

export function EntryChangesBtn() {
  const {
    setOpenLocation,
    allCheckedBoxes,
    setCookie,
    check,
    deleteAllBtnClicked,
    removeCookie,
    removedAllLocs,
  } = useContext(LocationContext);

  const cookieItems = [];
  allCheckedBoxes?.forEach((item) => {
    cookieItems.push(item.id);
  });

  const handleLocationCookie = () => {
    check && setCookie('provinces', check);
    allCheckedBoxes && setCookie('cities', cookieItems);

    if (removedAllLocs != false) {
      removeCookie('provinces');
      removeCookie('cities');
    }

    setOpenLocation('opaciti-0 invisible');
  };

  return (
    <div className='w-[93%] p-4 flex flex-row-reverse gap-2 justify-start bg-white items-center absolute bottom-0 '>
      <button
        onClick={handleLocationCookie}
        className={
          allCheckedBoxes?.length > 0 || deleteAllBtnClicked
            ? 'hover:opacity-[0.8] outline-none text-white bg-[#84105C] rounded-lg text-sm '
            : 'text-gray-300 bg-gray-100 rounded-lg text-sm hover:opacity-[0.8] outline-none cursor-not-allowed'
        }
      >
        تایید
      </button>

      <button
        onClick={() => setOpenLocation('opaciti-0 invisible')}
        className=' border  bg-gray-200 rounded-lg text-sm'
      >
        انصراف
      </button>
    </div>
  );
}
