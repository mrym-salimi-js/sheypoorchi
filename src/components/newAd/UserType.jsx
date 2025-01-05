import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserType } from '../../store/newAdSlice';

export default function UserType() {
  const [userType, setUserType] = useState('شخص');
  const userTypeRef = useRef();
  const dispatch = useDispatch();

  const handleUserType = (type) => {
    userTypeRef.current.value = type;
    setUserType(type);
  };

  useEffect(() => {
    dispatch(updateUserType({ userType }));
  }, [userType]);

  return (
    <div className='w-full flex flex-col gap-3 items-start justify-between cursor-pointer'>
      <p className='text-md'>نوع کاربر</p>
      <div className='flex gap-2 items-center'>
        <input ref={userTypeRef} className='hidden' />
        <p
          onClick={() => handleUserType('شخص')}
          className={`w-16 text-sm  rounded-full p-3  border text-center transition-all ${
            userType === 'شخص'
              ? `text-[#84105C] border-[#84105C] bg-pink-50`
              : `text-[#777777] border-[#cccccc] bg-gray-50 hover:text-[#84105C]`
          }`}
        >
          شخص
        </p>
        <p
          onClick={() => handleUserType('شرکت/فروشگاه')}
          className={`text-sm rounded-full p-3 border transition-all ${
            userType !== 'شخص'
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
