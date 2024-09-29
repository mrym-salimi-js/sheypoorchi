import { useContext, useEffect, useRef, useState } from 'react';
import { NewAdFormProvider } from '../NewAdForm';

export default function UserType({ storagePram }) {
  const { setNewAdStorageValue, newAdStorageValue } =
    useContext(NewAdFormProvider);
  const [userType, setUserType] = useState('فرد');
  const userTypeRef = useRef();

  const handleUserType = (type) => {
    userTypeRef.current.value = type;
    setUserType(type);
  };

  useEffect(() => {
    setNewAdStorageValue({
      ...newAdStorageValue,
      [`${storagePram}`]: userType,
    });
  }, [userType]);

  return (
    <div className='w-full flex flex-col gap-3 items-start justify-between cursor-pointer'>
      <p className='text-md'>نوع کاربر</p>
      <div className='flex gap-4 items-center'>
        <input ref={userTypeRef} className='hidden' />
        <p
          onClick={() => handleUserType('فرد')}
          className={`w-16 text-sm  rounded-full p-3 border text-center ${
            userType === 'فرد'
              ? `text-[#84105C] border-[#84105C] bg-pink-50`
              : `text-[#777777] border-[#cccccc] bg-gray-50 hover:text-[#84105C]`
          }`}
        >
          فرد
        </p>
        <p
          onClick={() => handleUserType('شرکت/فروشگاه')}
          className={`text-sm rounded-full p-3 border ${
            userType !== 'فرد'
              ? `text-[#84105C] border-[#84105C] bg-pink-50`
              : `text-[#777777] border-[#cccccc] bg-gray-50 hover:text-[#84105C]`
          }`}
        >
          شرکت/فروشگاه
        </p>
      </div>
    </div>
  );
}
