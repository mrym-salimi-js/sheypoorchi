import { Outlet } from 'react-router-dom';
import Menu from '../../components/user/menu/Menu';
import { updateUserStatus } from '../../services/user/updateUserStatus';
import { useEffect } from 'react';
// import { useEffect } from 'react';

export default function Account() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    updateUserStatus('online');

    // هندل کردن بسته شدن پنجره یا رفرش
    const handleBeforeUnload = () => {
      const url = `${baseURL}/api/users/status/offline`;
      const data = JSON.stringify({}); // اگر بک‌اند نیاز به body نداره خالی بذار

      // استفاده از sendBeacon چون مطمئن‌تره
      navigator.sendBeacon(url, data);
    };

    // هندل کردن تغییر صفحه (رفتن به جای دیگه)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        updateUserStatus('offline');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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
