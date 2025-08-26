// import PageLoading from './components/globals/PageLoading';
import ProtectectedAuth from '../components/ProtectectedAuth';
import { getUser } from '../services/user/getUser';
import { getUserAds } from '../services/user/getUserAds';
import { getChatContacts } from '../services/user/getChatContacts';
import { getSavedAds } from '../services/user/getSavedAds';
// import { QueryClient } from '@tanstack/react-query';
import { lazy } from 'react';
import { SuspenseWrapper } from './SuspenseWrapper';

const Dashboard = lazy(() => import('../pages/user/Dashboard'));
const Account = lazy(() => import('../pages/user/Account'));
const Messages = lazy(() => import('../pages/user/Messages'));
const MySavedAds = lazy(() => import('../pages/user/MySavedAds'));
const MyAds = lazy(() => import('../pages/user/MyAds'));
const Profile = lazy(() => import('../pages/user/Profile'));

import { queryClient } from '../queryClient';

export const userLoader = async () => {
  const user = await queryClient.fetchQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
  return { user };
};

export const userAdsLoader = async () => {
  const userAds = await queryClient.fetchQuery({
    queryKey: ['userAds'],
    queryFn: getUserAds,
    staleTime: 5 * 60 * 1000,
  });
  return { userAds };
};
export const userChatContactsLoader = async () => {
  const userChatContacts = await queryClient.fetchQuery({
    queryKey: ['userChatContacts'],
    queryFn: getChatContacts,
  });
  return { userChatContacts };
};
export const savedAdsLoader = async () => {
  const savedAds = await queryClient.fetchQuery({
    queryKey: ['userSavedAds'],
    queryFn: getSavedAds,
    staleTime: 5 * 60 * 1000,
  });
  return { savedAds };
};
export const chatPageLoader = async () => {
  const [user, userChatContacts] = await Promise.all([
    userLoader(),

    userChatContactsLoader(),
  ]);
  return { user, userChatContacts };
};
export const dashboardLoader = async () => {
  const [user, userAds, userChatContacts, savedAds] = await Promise.all([
    userLoader(),
    userAdsLoader(),
    userChatContactsLoader(),
    savedAdsLoader(),
  ]);
  return { user, userAds, userChatContacts, savedAds };
};

export const UserAccountRoute = [
  {
    element: <ProtectectedAuth />,
    children: [
      {
        element: <Account />,
        path: 'account',
        children: [
          {
            path: 'dashboard',
            element: (
              <SuspenseWrapper>
                <Dashboard />
              </SuspenseWrapper>
            ),
            loader: dashboardLoader,
          },
          {
            path: 'messages',
            element: <Messages />,
            loader: chatPageLoader,
          },
          {
            path: 'messages/:adId',
            element: <Messages />,
            loader: chatPageLoader,
          },

          {
            path: 'myProfile',
            element: (
              <SuspenseWrapper>
                <Profile />
              </SuspenseWrapper>
            ),
            loader: userLoader,
          },
          {
            path: 'myAds',
            element: <MyAds />,
            loader: userAdsLoader,
          },
          {
            path: 'mySavedAds',
            element: <MySavedAds />,
            loader: savedAdsLoader,
          },
        ],
      },
    ],
  },
];
