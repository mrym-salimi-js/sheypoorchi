import { Outlet, useLoaderData } from 'react-router-dom';
import Menu from '../../components/user/menu/Menu';
import { updateUserStatus } from '../../services/user/updateUserStatus';
// import { useEffect } from 'react';

export default function Account() {
  updateUserStatus();
  const { user } = useLoaderData();

  return (
    <>
      <Menu photo={user?.photo} name={user?.name} />

      <div className='w-full h-full  bg-gray-50 flex flex-col gap-5 px-3 md:px-7 items-end '>
        <Outlet />
      </div>
    </>
  );
}
