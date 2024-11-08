import { useState } from 'react';
import TextComponent from '../components/formFileds/TextComponent';
import { useNavigate } from 'react-router-dom';
import { linkTo } from '../functions/globals/linkTo';

export default function Register() {
  const [validation, setValidation] = useState();
  const navigateTo = useNavigate();
  const handleRegister = () => {
    if (validation !== undefined && validation === '') {
      console.log(validation);
    }
  };
  const handleNavTo = (event) => {
    linkTo(event, navigateTo, `/login`);
  };
  return (
    <div className='w-full h-full absolute flex justify-center items-center'>
      <div className='w-[90%]  md:w-[52%] lg:w-[58%] xl:w-[40%]  p-8 border border-gray-200 rounded-[2rem] bg-white '>
        <p className='py-2 px-4 text-lg border-r-4 border-pink-400'>
          ثبت نام کاربر
        </p>
        <div className='w-[98%]  relative right-[2%] mt-5 p-4 flex flex-col gap-6 justify-between'>
          <TextComponent
            adLable={'ایمیل'}
            filedType={'text'}
            valueType={'tel'}
            type={'email'}
            validation={validation}
            setValidation={setValidation}
          />
          <TextComponent
            adLable={'رمز عبور'}
            filedType={'text'}
            valueType={'tel'}
            type={'password'}
            validation={validation}
            setValidation={setValidation}
          />
          <TextComponent
            adLable={'تکرار رمز عبور'}
            filedType={'text'}
            valueType={'tel'}
            type={'confirm-password'}
            validation={validation}
            setValidation={setValidation}
          />
        </div>
        <div className='w-full p-2 mt-2 flex  justify-between items-center'>
          <a href='/login' onClick={handleNavTo}>
            <p className='text-gray-300 text-sm mr-4'>قبلا ثبت نام کردی؟</p>
          </a>
          <button
            onClick={handleRegister}
            className='w-36 h-11 bg-[#84105C] p-3 rounded-full flex gap-3 items-center justify-around  hover:opacity-[0.9] shadow-md'
          >
            <p className='text-sm text-white'>ثبت نام</p>
            <div className='rounded-full bg-[#89677f87] p-1 relative right-3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#ffffff'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 19.5 8.25 12l7.5-7.5'
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
