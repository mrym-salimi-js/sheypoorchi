import Menu from '../../components/user/menu/Menu';

import defaultProfile from '../../assets/img/images.png';
import { InVisible, Visible } from '../../components/globals/Icons';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const photoRef = useRef();
  const [userInfo, setUserInfo] = useState();
  const [formData, setFormData] = useState();
  console.log(formData);
  useEffect(() => {
    const getMyAds = async () => {
      const savedAdIds = await axios.get(`${baseURL}/api/users/me`, {
        withCredentials: true,
      });
      if (!savedAdIds || savedAdIds.data.status === 'fail') return;
      setUserInfo(savedAdIds.data.data);
    };
    getMyAds();
  }, []);

  const handleSubmit = async () => {
    await axios.patch(`${baseURL}/api/users/updateMe`, formData, {
      withCredentials: true,
    });
  };
  return (
    <div className='w-full h-full bg-gray-50 flex flex-col gap-5 px-3 lg:px-7 items-end '>
      <Menu />
      <div className='w-full h-full md:w-[66%]  lg:w-[76%] xl:w-[81%] p-2 pt-6 flex flex-col items-center  gap-9'>
        {/* Edit Photo  rgb(169 206 173)*/}
        <div className='w-[98%] h-40 sticky top-6 z-50 rounded-3xl shadow-sm bg-[rgb(169,206,173)] '>
          <p className='w-full mt-16 text-center text-gray-50 text-md'>
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
            <p className='text-sm self-start relative top-9 text-gray-50'>
              مریم سلیمی
            </p>
          </div>
        </div>
        {/* Edit Info */}
        <div className='w-[98%] h-auto p-9 relative top-9 grid grid-cols-1 lg:grid-cols-2  gap-2'>
          {/* Edit User Info */}
          <div className='w-full h-auto  flex flex-col gap-3'>
            <p className='w-auto h-7 text-sm text-gray-500 flex items-center p-3 py-5 border-r-4 border-[rgb(169,206,173)'>
              ویرایش اطلاعات
            </p>
            {[
              { name: 'نام', key: 'name' },
              { name: 'ایمیل', key: 'email' },
            ].map((el, index) => {
              return (
                <ProfileItem
                  data={userInfo}
                  el={el}
                  key={index}
                  setFormData={setFormData}
                />
              );
            })}
          </div>

          {/* Edit User Pass */}
          <div className='w-full h-auto  flex flex-col gap-3'>
            <p className='w-auto h-7 text-sm text-gray-500 flex items-center p-3 py-5 border-r-4 border-[rgb(169,206,173)'>
              تغییر رمز عبور
            </p>
            {[
              { name: 'رمز عبور فعلی', key: 'currentPass' },
              { name: 'رمز عبور جدید', key: 'newPass' },
            ].map((el, index) => {
              return (
                <ProfileItem el={el} key={index} setFormData={setFormData} />
              );
            })}
          </div>
        </div>

        {/* Aplly Btn */}
        <div
          onClick={handleSubmit}
          className='w-full h-auto flex  items-center justify-center  p-2'
        >
          <span className='w-1/2 h-14 slef-end  flex justify-center items-center bg-[rgb(169,206,173)] text-white cursor-pointer rounded-lg hover:opacity-[0.7] '>
            اعمال تغییرات
          </span>
        </div>
      </div>
    </div>
  );
}

export function ProfileItem({ el, data, setFormData }) {
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
