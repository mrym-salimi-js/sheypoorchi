import { useLocation } from 'react-router-dom';
import Menu from '../../components/user/menu/Menu';
import Dashboard from './Dashboard';
import Messages from './Messages';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../services/user/getUser';
import PageLoading from '../../components/globals/PageLoading';
import { getUserAds } from '../../services/user/getUserAds';
import { getChatContacts } from '../../services/user/getChatContacts';
import Profile from './Profile';
import MyAds from './MyAds';
import MySavedAds from './MySavedAds';
import { getSavedAds } from '../../services/user/getSavedAds';

export default function Account() {
  const locationUrl = useLocation();

  const { data: user, isLoading: userIsLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  const { data: userAds, isLoading: userAdsIsLoading } = useQuery({
    queryKey: ['userAds'],
    queryFn: getUserAds,
  });
  const { data: userChats, isLoading: userChatsIsLoading } = useQuery({
    queryKey: ['userChats'],
    queryFn: getChatContacts,
  });
  const { data: userSavedAds, isLoading: userSavedAdsLoading } = useQuery({
    queryKey: ['userSavedAds'],
    queryFn: getSavedAds,
  });

  return (
    <>
      {(userIsLoading ||
        userAdsIsLoading ||
        userChatsIsLoading ||
        userSavedAdsLoading) && <PageLoading />}

      <Menu photo={user?.photo} />

      <div className='w-full h-full  bg-gray-50 flex flex-col gap-5 px-3 md:px-7 items-end '>
        {locationUrl.pathname === '/dashboard' && (
          <Dashboard
            userInfo={user}
            userAds={userAds?.result}
            userChats={userChats?.result}
          />
        )}
        {locationUrl.pathname.includes('/dashboard/messages') && (
          <Messages contactList={userChats?.data} />
        )}
        {locationUrl.pathname === '/dashboard/myProfile' && (
          <Profile userData={user} />
        )}
        {locationUrl.pathname === '/dashboard/myAds' && (
          <MyAds userAds={userAds?.data} />
        )}
        {locationUrl.pathname === '/dashboard/mySavedAds' && (
          <MySavedAds savedAds={userSavedAds} />
        )}
      </div>
    </>
  );
}
