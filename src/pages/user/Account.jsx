import { Outlet } from 'react-router-dom';
import Menu from '../../components/user/menu/Menu';
import { updateUserStatus } from '../../services/user/updateUserStatus';
// import { useEffect } from 'react';

export default function Account() {
  updateUserStatus();

  return (
    <>
      <Menu />

      <div className='w-full h-full   flex flex-col gap-5 px-3 md:px-7 items-end '>
        <Outlet />
      </div>
    </>
  );
}
