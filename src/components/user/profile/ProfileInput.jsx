import { useEffect, useState } from 'react';
import { InVisible, Visible } from '../../globals/Icons';

export default function ProfileInput({ el, data, register, setValue, errors }) {
  const [passVis, setPassVis] = useState('password');
  const [inputVal, setInputVal] = useState();

  const handlePassVisiblity = () => {
    passVis === 'password' ? setPassVis('text') : setPassVis('password');
  };

  useEffect(() => {
    !el?.name.includes('pass') &&
      setValue(el?.name, data && data[el.name], { shouldValidate: true });
  }, [setValue]);

  const handleInputValue = (event) => {
    setInputVal(event.target.value);

    // setFormData((prevData) => ({ ...prevData, [el.name]: event.target.value }));
  };
  return (
    <div className='w-full h-auto p-2 flex flex-col gap-1'>
      <p className='w-auto  p-2  text-[0.8rem] text-gray-400 pr-5'>
        {el?.label}
      </p>
      <div className='w-full p-3  h-14 border rounded-2xl bg-white overflow-hidden  flex items-center justify-between'>
        <input
          {...register(el?.name, { required: 'لطفا این قسمت را کامل کنید' })}
          onChange={handleInputValue}
          value={data && !inputVal ? data[el.name] : inputVal}
          type={el?.label.includes('رمز') ? passVis : 'text'}
          className='w-full h-full outline-none text-[0.8rem] text-gray-300 placeholder:text-gray-300'
          placeholder={
            (el?.label.includes('فعلی') && 'رمز عبور فعلی خود را وارد کنید') ||
            (el?.label.includes('جدید') && 'رمز عبور جدید خود را وارد کنید')
          }
        />
        {el?.label.includes('رمز') && (
          <div
            onClick={handlePassVisiblity}
            className='w-auto h-auto cursor-pointer'
          >
            {passVis !== 'text' ? (
              <InVisible color={'#cccccc'} size={'size-6'} />
            ) : (
              <Visible color={'#cccccc'} size={'size-6'} />
            )}
          </div>
        )}
      </div>
      {errors[el.name] && (
        <p className='w-full h-auto p-2 text-[0.7rem] text-red-500'>
          {errors[el.name].message}
        </p>
      )}
    </div>
  );
}
