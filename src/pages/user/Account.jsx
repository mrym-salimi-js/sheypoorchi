import { Outlet, useLocation } from 'react-router-dom';
import Menu from '../../components/user/menu/Menu';
import { updateUserStatus } from '../../services/user/updateUserStatus';
import { useEffect } from 'react';
// import { useEffect } from 'react';

export default function Account() {
  const location = useLocation();
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    // هر بار مسیر تغییر کرد
    updateUserStatus('online');

    return () => {
      // وقتی مسیر ترک شد
      updateUserStatus('offline');
    };
  }, [location.pathname]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const url = `${baseURL}/api/users/status/offline`;
      const data = JSON.stringify({});
      navigator.sendBeacon(url, data);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <Menu />

      <div className='w-full h-full   flex flex-col gap-5 px-3 md:px-7 items-end '>
        <Outlet />
      </div>
    </>
  );
}
