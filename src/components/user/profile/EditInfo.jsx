import axios from 'axios';
import ProfileInput from './ProfileInput';
import { useState } from 'react';

export default function EditInfo({ userInfo }) {
  const [formData, setFormData] = useState();

  const baseURL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async () => {
    await axios.patch(`${baseURL}/api/users/updateMe`, formData, {
      withCredentials: true,
    });
  };

  return (
    <div className='w-full lg:w-1/2 h-auto  flex flex-col gap-3'>
      {[
        { name: 'نام', key: 'name' },
        { name: 'ایمیل', key: 'email' },
      ].map((el, index) => {
        return (
          <ProfileInput
            data={userInfo}
            el={el}
            key={index}
            setFormData={setFormData}
          />
        );
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
