import { Chat, Home, Logout, Saved, Speaker, User } from '../../globals/Icons';
import { Link, useLocation } from 'react-router-dom';

export default function MenuItems() {
  const locationUrl = useLocation();
  return (
    <div className='w-full h-[22rem] flex flex-col items-center gap-4 px-10'>
      <Link
        to={'/myAccount/dashboard'}
        className='w-[95%] transition-all cursor-pointer rounded-2xl p-3 hover:bg-[#2277606f] flex gap-4 items-center'
      >
        <Home
          color={
            locationUrl.pathname.includes('/dashboard') ? '#ffffff' : '#227760'
          }
          size={'size-5'}
        />
        <p
          className={`text-sm ${
            locationUrl.pathname.includes('/dashboard')
              ? `text-white`
              : `text-[#227760]`
          } `}
        >
          داشبورد
        </p>
      </Link>
      <Link
        to={'/myAccount/myProfile'}
        className='w-[95%] transition-all cursor-pointer rounded-2xl p-3 hover:bg-[#2277606f] flex gap-4 items-center'
      >
        <User
          color={
            locationUrl.pathname.includes('/myProfile') ? '#ffffff' : '#227760'
          }
          size={'size-5'}
        />
        <p
          className={`text-sm ${
            locationUrl.pathname.includes('/myProfile')
              ? `text-white`
              : `text-[#227760]`
          } `}
        >
          پروفایل من
        </p>
      </Link>
      <Link
        to={'/myAccount/myAds'}
        className='w-[95%] transition-all cursor-pointer rounded-2xl p-3 hover:bg-[#2277606f] flex gap-4 items-center'
      >
        <Speaker
          color={
            locationUrl.pathname.includes('/myAds') ? '#ffffff' : '#227760'
          }
          size={'size-5'}
        />
        <p
          className={`text-sm ${
            locationUrl.pathname.includes('/myAds')
              ? `text-white`
              : `text-[#227760]`
          } `}
        >
          آگهی های من
        </p>
      </Link>
      <Link
        to={'/myAccount/mySavedAds'}
        className='w-[95%] transition-all cursor-pointer rounded-2xl p-3 hover:bg-[#2277606f] flex gap-4 items-center'
      >
        <Saved
          fill={
            locationUrl.pathname.includes('/mySavedAds') ? '#ffffff' : '#227760'
          }
          size={'size-5'}
        />
        <p
          className={`text-sm ${
            locationUrl.pathname.includes('/mySavedAds')
              ? `text-white`
              : `text-[#227760]`
          } `}
        >
          ذخیره ها
        </p>
      </Link>
      <Link
        to={'/myAccount/messages'}
        className='w-[95%] transition-all cursor-pointer rounded-2xl p-3 hover:bg-[#2277606f] flex gap-4 items-center'
      >
        <Chat
          color={
            locationUrl.pathname.includes('/messages') ? '#ffffff' : '#227760'
          }
          size={'size-5'}
        />
        <p
          className={`text-sm ${
            locationUrl.pathname.includes('/messages')
              ? `text-white`
              : `text-[#227760]`
          } `}
        >
          پیام های من
        </p>
      </Link>
      <Link
        to={'/'}
        className='w-[95%] transition-all cursor-pointer rounded-2xl p-3 hover:bg-[#2277606f] flex gap-4 items-center'
      >
        <Logout color={'#227760'} size={'size-5'} />
        <p className='text-sm text-[#227760]'>خروج</p>
      </Link>
    </div>
  );
}
