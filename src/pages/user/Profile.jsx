import Menu from '../../components/user/menu/Menu';

import defaultProfile from '../../assets/img/images.png';
import { InVisible } from '../../components/globals/Icons';
import { useRef, useState } from 'react';

export default function Profile() {
  const photoRef = useRef();

  return (
    <div className='w-full h-full bg-gray-50 flex flex-col gap-5 px-3 lg:px-7 items-end '>
      <Menu />
      <div className='w-full h-full md:w-[66%]  lg:w-[76%] xl:w-[81%] p-2 pt-6 flex flex-col items-center  gap-9'>
        {/* Edit Photo */}
        <div className='w-[98%] h-40 rounded-3xl shadow-sm bg-gray-200 '>
          <p className='w-full mt-16 text-center text-gray-300 text-md'>
            ویرایش اطلاعات حساب کاربری
          </p>
          <div className='w-auto flex gap-12 items-center'>
            <div className='w-auto flex flex-col items-center relative bottom-3 right-9'>
              <input className='hidden' type='file' ref={photoRef} />
              <img
                onClick={() => {
                  photoRef?.current?.click();
                }}
                className='w-36 z-30 cursor-pointer  border-[10px] border-gray-50 rounded-full overflow-hidden '
                src={defaultProfile}
              />
            </div>
            <p className='text-sm self-start relative top-9 text-gray-500'>
              مریم سلیمی
            </p>
          </div>
        </div>

        <div className='w-[98%] h-auto p-9 relative top-9 flex flex-col gap-9'>
          {/* Edit User Info */}
          <div className='w-full h-auto  flex flex-col gap-3'>
            <p className='w-auto h-7 text-sm text-gray-500 flex items-center p-3 py-5 border-r-4 border-gray-600'>
              ویرایش اطلاعات
            </p>
            {['نام', 'نام خانوادگی', 'ایمیل'].map((el, index) => {
              return <ProfileItem el={el} key={index} />;
            })}
          </div>

          {/* Edit User Pass */}
          <div className='w-full h-auto  flex flex-col gap-3'>
            <p className='w-auto h-7 text-sm text-gray-500 flex items-center p-3 py-5 border-r-4 border-gray-600'>
              تغییر رمز عبور
            </p>
            {['رمز عبور فعلی', 'رمز عبور جدید'].map((el, index) => {
              return <ProfileItem el={el} key={index} />;
            })}
          </div>
        </div>
        {/* Aplly Btn */}
        <div className='w-full h-auto flex  items-center justify-center  p-2'>
          <span className='w-1/2 h-14 slef-end  flex justify-center items-center bg-[#59b39b] text-white cursor-pointer rounded-lg hover:opacity-[0.7] '>
            اعمال تغییرات
          </span>
        </div>
      </div>
    </div>
  );
}

export function ProfileItem({ el }) {
  const [passVis, setPassVis] = useState('password');
  const handlePassVisiblity = () => {
    passVis === 'password' ? setPassVis('text') : setPassVis('password');
  };
  return (
    <div className='w-auto h-auto p-2 flex flex-col gap-1'>
      <p className='w-auto  p-2  text-[0.8rem] text-gray-400 pr-5'>{el}</p>
      <div className='w-full p-3 lg:w-[50%] h-14 border rounded-2xl bg-white overflow-hidden  flex items-center justify-between'>
        <input
          type={passVis}
          className='w-full h-full outline-none text-[0.8rem] text-gray-300'
        />
        {el?.includes('رمز') && (
          <div
            onClick={handlePassVisiblity}
            className='w-auto h-auto cursor-pointer'
          >
            <InVisible color={'#cccccc'} size={'size-6'} />
          </div>
        )}
      </div>
    </div>
  );
}
