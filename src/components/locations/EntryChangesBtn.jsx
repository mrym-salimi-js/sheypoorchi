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
    cookieItems.push(item?.id);
  });

  // console.log(removedAllLocs);

  const handleLocationCookie = () => {
    check && setCookie('provinces', check);
    allCheckedBoxes && setCookie('cities', cookieItems);

    if (removedAllLocs === true) {
      removeCookie('provinces');
      removeCookie('cities');
    }

    setOpenLocation('opaciti-0 invisible');
  };

  return (
    <div className='w-[93%] p-4 flex flex-row-reverse gap-2 justify-start bg-white items-center absolute bottom-7 lg:bottom-3 '>
      <button
        onClick={handleLocationCookie}
        className={
          allCheckedBoxes?.length > 0 || deleteAllBtnClicked
            ? 'hover:opacity-[0.8] w-20 p-3 outline-none text-white bg-[#84105C] rounded-lg text-sm '
            : 'text-gray-300 w-20 p-3 bg-gray-100 rounded-lg text-sm hover:opacity-[0.8] outline-none cursor-not-allowed'
        }
      >
        تایید
      </button>

      <button
        onClick={() => setOpenLocation('opaciti-0 invisible')}
        className='w-20 border p-3  bg-gray-200 rounded-lg text-sm'
      >
        انصراف
      </button>
    </div>
  );
}
