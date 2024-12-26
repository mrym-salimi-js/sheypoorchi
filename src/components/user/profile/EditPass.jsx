import { useState } from 'react';
import ProfileInput from './ProfileInput';
import axios from 'axios';

export default function EditPass() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState();

  const handleSubmit = async () => {
    await axios.patch(`${baseURL}/api/users/updateMyPassword`, formData, {
      withCredentials: true,
    });
  };

  return (
    <div className='w-full lg:w-1/2 h-auto  flex flex-col gap-3'>
      {[
        { name: 'رمز عبور فعلی', key: 'passwordCurrent' },
        { name: 'رمز عبور جدید', key: 'password' },
        { name: ' تکرار رمز عبور جدید', key: 'passwordConfirm' },
      ].map((el, index) => {
        return <ProfileInput el={el} key={index} setFormData={setFormData} />;
      })}
      {/* Aplly Btn */}
      <div
        onClick={handleSubmit}
        className='w-full h-auto flex  items-center justify-center  p-2'
      >
        <span className='w-full h-14 slef-end  flex justify-center items-center bg-[rgb(169,206,173)] text-white cursor-pointer rounded-lg hover:opacity-[0.7] '>
          اعمال تغییرات
        </span>
      </div>
    </div>
  );
}
