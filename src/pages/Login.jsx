import { useRef, useState } from 'react';
import TextComponent from '../components/formFileds/TextComponent';
import { linkTo } from '../functions/globals/linkTo';
import { useNavigate } from 'react-router-dom';
import { authenticateValidation } from '../functions/validation/adFormValidation';

export default function Login() {
  const inputRefs = useRef([]);
  const [validation, setValidation] = useState();
  const navigateTo = useNavigate();
  const handleLogin = () => {
    inputRefs?.current?.map((item) => {
      if (item.value === '') {
        authenticateValidation(
          (stateVal) => {
            setValidation(stateVal);
          },
          item.getAttribute('data-lable'),
          item.value,
          validation,
          item.type
        );
      }
    });
  };
  const handleNavTo = (event) => {
    linkTo(event, navigateTo, `/register`);
  };
  return (
    <div className='w-full h-full absolute flex justify-center items-center'>
      <div className='w-[90%]  md:w-[52%] lg:w-[58%] xl:w-[40%]  p-8 border border-gray-200 rounded-[2rem] bg-white '>
        <p className='py-2 px-4 text-lg border-r-4 border-pink-400'>
          ورود کاربر
        </p>
        <div className='w-[98%]  relative right-[2%] mt-5 p-4 flex flex-col gap-6 justify-between'>
          {[
            { lable: 'ایمیل', type: 'email', valueType: 'email' },
            { lable: 'رمز عبور', type: 'password', valueType: 'password' },
          ].map((item, index) => {
            return (
              <>
                <TextComponent
                  key={index}
                  index={index}
                  inputRefs={inputRefs}
                  adLable={item.lable}
                  filedType={'text'}
                  valueType={item.valueType}
                  type={item.type}
                  validation={validation}
                  setValidation={setValidation}
                />
              </>
            );
          })}
        </div>
        <div className='w-full p-2 mt-2 flex justify-between items-center'>
          <a href='/register' onClick={handleNavTo}>
            <p className='text-gray-300 text-sm mr-4'>هنوز ثبت نام نکردی؟</p>
          </a>
          <button
            onClick={handleLogin}
            className='w-36 h-11 bg-[#84105C] p-3 rounded-full flex gap-3 items-center justify-around  hover:opacity-[0.9] shadow-md'
          >
            <p className='text-sm text-white'>ورود</p>
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
