import Menu from '../../components/user/menu/Menu';
import { useEffect, useState } from 'react';
import Header from '../../components/user/profile/Header';
import Tabs from '../../components/user/profile/Tabs';
import EditInfo from '../../components/user/profile/EditInfo';
import EditPass from '../../components/user/profile/EditPass';
import axios from 'axios';

export default function Profile() {
  const [profileTab, setProfileTab] = useState('info');
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [userInfo, setUserInfo] = useState();
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
  return (
    <div className='w-full h-full bg-gray-50 flex flex-col gap-5 px-3 lg:px-7 items-end '>
      <Menu />
      <div className='w-full h-full md:w-[66%]  lg:w-[76%] xl:w-[81%] p-2 pt-6 flex flex-col items-center  gap-9'>
        {/* Header && Edit Photo  */}
        <Header userInfo={userInfo} setUserInfo={setUserInfo} />
        {/* Edit Info */}
        <div className='w-[98%] h-auto p-9 relative top-9 flex flex-col gap-2'>
          {/* Tabs */}
          <Tabs setProfileTab={setProfileTab} profileTab={profileTab} />

          {profileTab === 'info' ? (
            <EditInfo userInfo={userInfo} />
          ) : (
            <EditPass />
          )}
        </div>
      </div>
    </div>
  );
}
