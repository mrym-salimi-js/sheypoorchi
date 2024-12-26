import { useState } from 'react';
import { InVisible, Visible } from '../../globals/Icons';

export default function ProfileInput({ el, data, setFormData }) {
  const [passVis, setPassVis] = useState('password');
  const [inputVal, setInputVal] = useState();

  const handlePassVisiblity = () => {
    passVis === 'password' ? setPassVis('text') : setPassVis('password');
  };

  const handleInputValue = (event) => {
    setInputVal(event.target.value);
    setFormData((prevData) => ({ ...prevData, [el.key]: event.target.value }));
  };
  return (
    <div className='w-full h-auto p-2 flex flex-col gap-1'>
      <p className='w-auto  p-2  text-[0.8rem] text-gray-400 pr-5'>
        {el?.name}
      </p>
      <div className='w-full p-3  h-14 border rounded-2xl bg-white overflow-hidden  flex items-center justify-between'>
        <input
          onChange={handleInputValue}
          name={el?.key}
          value={data && !inputVal ? data[el.key] : inputVal}
          type={el?.name.includes('رمز') ? passVis : 'text'}
          className='w-full h-full outline-none text-[0.8rem] text-gray-300 placeholder:text-gray-300'
          placeholder={
            (el?.name.includes('فعلی') && 'رمز عبور فعلی خود را وارد کنید') ||
            (el?.name.includes('جدید') && 'رمز عبور جدید خود را وارد کنید')
          }
        />
        {el?.name.includes('رمز') && (
          <div
            onClick={handlePassVisiblity}
            className='w-auto h-auto cursor-pointer'
          >
            {passVis === 'text' ? (
              <InVisible color={'#cccccc'} size={'size-6'} />
            ) : (
              <Visible color={'#cccccc'} size={'size-6'} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
