import { useState } from 'react';
import Header from '../../components/user/profile/Header';
import Tabs from '../../components/user/profile/Tabs';
import EditInfo from '../../components/user/profile/EditInfo';
import EditPass from '../../components/user/profile/EditPass';
import { useLoaderData } from 'react-router-dom';

export default function Profile() {
  const [profileTab, setProfileTab] = useState('info');
  const [userInfo, setUserInfo] = useState();
  const { user } = useLoaderData();
  // console.log(userInfo);
  return (
    <div className='w-full h-full md:w-[66%]  lg:w-[76%] xl:w-[81%] p-2 pt-6 flex flex-col items-center  gap-9'>
      {/* Header && Edit Photo  */}
      <Header
        userInfo={userInfo === undefined ? user : userInfo}
        setUserInfo={setUserInfo}
      />
      {/* Edit Info */}
      <div className='w-[98%] h-auto p-9 relative top-9 flex flex-col gap-2'>
        {/* Tabs */}
        <Tabs setProfileTab={setProfileTab} profileTab={profileTab} />

        {profileTab === 'info' ? (
          <EditInfo userInfo={userInfo === undefined ? user : userInfo} />
        ) : (
          <EditPass />
        )}
      </div>
    </div>
  );
}
