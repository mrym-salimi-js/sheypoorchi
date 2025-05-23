import { Chat, Home, Logout, Saved, Speaker, User } from '../../globals/Icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/user/logout';

export default function MenuItems() {
  const locationUrl = useLocation();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    logout(navigateTo);
  };

  const menuItems = [
    { to: '/dashboard', icon: Home, label: 'پیشخوان' },
    { to: '/myProfile', icon: User, label: 'پروفایل من' },
    { to: '/myAds', icon: Speaker, label: 'آگهی های من' },
    {
      to: '/mySavedAds',
      icon: Saved,
      label: 'ذخیره ها',
    },
    { to: '/messages', icon: Chat, label: 'پیام های من' },
    { to: '/', icon: Logout, label: 'خروج' },
  ];

  return (
    <div className='w-full h-[22rem] flex flex-col items-center gap-4 px-10'>
      {menuItems.map((i) => {
        return (
          <>
            <Link
              onClick={i.label === 'خروج' && handleLogout}
              to={i.to}
              className='w-[95%] transition-all cursor-pointer rounded-2xl p-3 hover:bg-[#2277606f] flex gap-4 items-center'
            >
              <i.icon
                color={locationUrl.pathname === i.to ? '#ffffff' : '#227760'}
                size={'size-5'}
              />
              <p
                className={`text-sm ${
                  locationUrl.pathname === i.to
                    ? `text-white`
                    : `text-[#227760]`
                } `}
              >
                {i.label}
              </p>
            </Link>
          </>
        );
      })}
    </div>
  );
}
