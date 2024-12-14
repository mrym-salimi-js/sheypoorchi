import { useState } from 'react';
import defaultProfile from '../../assets/img/images.png';
import {
  Chat,
  CherveLeftDouble,
  Home,
  Logout,
  Pencil,
  Saved,
  Speaker,
  User,
} from '../globals/Icons';
import { Link, useLocation } from 'react-router-dom';

export default function Menu() {
  const locationUrl = useLocation();

  const [openMenu, setOpenMenu] = useState('translate-x-[87%]');
  const handleOpeningMenu = () => {
    openMenu.includes('translate-x-0')
      ? setOpenMenu('translate-x-[87%]')
      : setOpenMenu('translate-x-0');
  };

  return (
    <div
      className={`w-full sm:w-[35%]  lg:w-[25%] xl:w-[20%]  fixed right-0 h-full flex  items-center justify-center p-4 transition-all ease-in-out duration-500 z-[100000]  ${openMenu} sm:translate-x-0`}
    >
      {/* Menu Colored Box */}
      <div className='w-full  h-full rounded-[60px] rounded-b-[90px] rounded-tl-[81px] md:rounded-tl-[60px] justify-between bg-[#6e2956] flex flex-col items-center '>
        <div className='w-full flex flex-col gap-6'>
          <div className='w-full flex flex-col justify-between'>
            <div className='w-[97.9%] md:w-full   h-[54px] self-start   rounded-tr-[58px] rounded-tl-[58px] rounded-b-[0px]  z-30 bg-[#6e2956]'></div>
            <div className='w-full p-10 pt-0 pb-0 flex items-center'>
              <div className='w-full h-auto px-2 py-4 mt-4 flex flex-col items-center justify-center gap-5 border-[#773a62]  border-b-[1px]'>
                <img
                  className='w-16 h-16 object-cover rounded-full'
                  src={defaultProfile}
                ></img>
                <p className='text-sm text-white'>مریم سلیمی</p>
                <Link
                  to={'/myAccount/editMe'}
                  className=' cursor-pointer flex items-center'
                >
                  <Pencil color={'#90587c'} size={'size-6'} />
                </Link>
              </div>
            </div>
          </div>
          {/* Menu Items */}
          <div className='w-full h-[22rem] flex flex-col items-center gap-4 px-10'>
            <div className='w-[95%] transition-all cursor-pointer rounded-2xl p-3 hover:bg-[#cda7c0c3] flex gap-4 items-center'>
              <Home
                color={
                  locationUrl.pathname.includes('/dashboard')
                    ? '#ffffff'
                    : '#90587c'
                }
                size={'size-5'}
              />
              <p
                className={`text-sm ${
                  locationUrl.pathname.includes('/dashboard')
                    ? `text-white`
                    : `text-[#90587c]`
                } `}
              >
                داشبورد
              </p>
            </div>
            <div className='w-[95%] transition-all cursor-pointer rounded-2xl p-3 hover:bg-[#cda7c0c3] flex gap-4 items-center'>
              <User color={'#90587c'} size={'size-5'} />
              <p className='text-sm text-[#90587c]'>پروفایل من</p>
            </div>
            <div className='w-[95%] transition-all cursor-pointer rounded-2xl p-3 hover:bg-[#cda7c0c3] flex gap-4 items-center'>
              <Speaker color={'#90587c'} size={'size-5'} />
              <p className='text-sm text-[#90587c]'>آگهی های من</p>
            </div>
            <div className='w-[95%] transition-all cursor-pointer rounded-2xl p-3 hover:bg-[#cda7c0c3] flex gap-4 items-center'>
              <Saved color={'#90587c'} size={'size-5'} />
              <p className='text-sm text-[#90587c]'>ذخیره ها</p>
            </div>
            <Link
              to={'/myAccount/messages'}
              className='w-[95%] transition-all cursor-pointer rounded-2xl p-3 hover:bg-[#cda7c0c3] flex gap-4 items-center'
            >
              <Chat color={'#90587c'} size={'size-5'} />
              <p className='text-sm text-[#90587c]'>چت های من</p>
            </Link>
            <div className='w-[95%] transition-all cursor-pointer rounded-2xl p-3 hover:bg-[#cda7c0c3] flex gap-4 items-center'>
              <Logout color={'#90587c'} size={'size-5'} />
              <p className='text-sm text-[#90587c]'>خروج</p>
            </div>
          </div>
        </div>

        <div className='w-[97.9%] md:w-full h-40  rounded-br-[58px] rounded-bl-[58px] self-start   z-30 bg-[#6e2956]'></div>
      </div>

      {/* Menu Opening Btn */}
      <div className='w-[8%] md:w-[9%] md:hidden h-full '>
        <div className='h-[11%] w-[10px] bg-gray-50  rounded-[7px] relative left-[25%] top-0'></div>
        <div
          onClick={handleOpeningMenu}
          className='h-[7%] w-full bg-[#6e2956]   rounded-l-3xl flex items-center  cursor-pointer'
        >
          <CherveLeftDouble
            color={'#ffffff'}
            size={'size-4 hover:opacity-[0.7] transition-all'}
          />
        </div>
        <div className='h-[81%] w-[10px] bg-gray-50  rounded-[7px] relative left-[25%] top-0'></div>
      </div>
    </div>
  );
}
