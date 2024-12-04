import { useRef, useState } from 'react';
import TextComponent from '../components/formFileds/text/TextComponent';
import { linkTo } from '../functions/globals/linkTo';
import { useNavigate } from 'react-router-dom';
import { authenticateValidation } from '../functions/validation/adFormValidation';
import axios from 'axios';
import { navTo } from '../functions/globals/navTo';
import { useCookies } from 'react-cookie';

export default function ForgetPassword() {
  const inputRefs = useRef([]);
  const [validation, setValidation] = useState();
  const navigateTo = useNavigate();
  const [cookie, setCookie] = useCookies();
  const handleForgetPass = async () => {
    // Check field form value after click on register btn
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

    // send form data
    if (!validation || Object?.keys(validation)?.length == 0) {
      try {
        const sendForm = await axios.post(
          'http://127.0.0.1:5137/api/users/forgetPassword',
          {
            email: inputRefs?.current[0].value,
          }
        );

        if (sendForm !== undefined) {
          sendForm.data.status === 'success' &&
            console.log('ایمیلی از طرف شیپورچی برای شما ارسال شد!');
        }
      } catch (error) {
        console.log(error.response);
      }
    }
  };
  const handleNavTo = (event, currentTarget) => {
    linkTo(event, navigateTo, currentTarget.getAttribute('href'));
  };
  return (
    <div className='w-full h-full absolute flex justify-center items-center'>
      <div className='w-[90%]  md:w-[52%] lg:w-[58%] xl:w-[40%]  p-8 border border-gray-200 rounded-[2rem] bg-white '>
        <p className='py-2 px-4 text-lg border-r-4 border-pink-400'>
          فراموشی رمز عبور
        </p>
        <div className='w-[98%]  relative right-[2%] mt-5 p-4 flex flex-col gap-6 justify-between'>
          {[{ lable: 'ایمیل', type: 'email', valueType: 'email' }].map(
            (item, index) => {
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
            }
          )}
        </div>
        <div className='w-full p-2 mt-2 flex justify-between items-center'>
          <div className='flex flex-col gap-2'>
            <a
              href='/login'
              onClick={(event) => handleNavTo(event, event.currentTarget)}
            >
              <p className='text-gray-300 text-sm mr-4'>رمز عبورم یادمه :)</p>
            </a>
          </div>
          <button
            onClick={handleForgetPass}
            className='w-36 h-11 bg-[#84105C] p-3 rounded-full flex gap-3 items-center justify-around  hover:opacity-[0.9] shadow-md'
          >
            <p className='text-sm text-white'>ارسال</p>
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
