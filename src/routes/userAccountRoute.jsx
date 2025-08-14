// import PageLoading from './components/globals/PageLoading';
import ProtectectedAuth from '../components/ProtectectedAuth';
import { getUser } from '../services/user/getUser';
import { getUserAds } from '../services/user/getUserAds';
import { getChatContacts } from '../services/user/getChatContacts';
import { getSavedAds } from '../services/user/getSavedAds';
import { QueryClient } from '@tanstack/react-query';
import { lazy } from 'react';

const Dashboard = lazy(() => import('../pages/user/Dashboard'));
const Account = lazy(() => import('../pages/user/Account'));
const Messages = lazy(() => import('../pages/user/Messages'));
const MySavedAds = lazy(() => import('../pages/user/MySavedAds'));
const MyAds = lazy(() => import('../pages/user/MyAds'));
const Profile = lazy(() => import('../pages/user/Profile'));

const queryClient = new QueryClient();

// Get Some Data Of User Before Loading Its Page
const dashboardLoader = async () => {
  const [user, userAds, userChats, savedAds] = await Promise.all([
    queryClient.fetchQuery({
      queryKey: ['user'],
      queryFn: getUser,
      staleTime: 5 * 60 * 1000,
    }),
    queryClient.fetchQuery({
      queryKey: ['userAds'],
      queryFn: getUserAds,
      staleTime: 5 * 60 * 1000,
    }),
    queryClient.fetchQuery({
      queryKey: ['userChats'],
      queryFn: getChatContacts,
      staleTime: 5 * 60 * 1000,
    }),
    queryClient.fetchQuery({
      queryKey: ['userSavedAds'],
      queryFn: getSavedAds,
      staleTime: 5 * 60 * 1000,
    }),
  ]);
  return { user, userAds, userChats, savedAds };
};

export const UserAccountRoute = [
  {
    element: <ProtectectedAuth />,
    children: [
      {
        element: <Account />,
        loader: dashboardLoader,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
            loader: dashboardLoader,
          },
          {
            path: 'messages',
            element: <Messages />,
          },
          {
            path: 'messages/:adId',
            element: <Messages />,
          },
          {
            path: 'myProfile',
            element: <Profile />,
            loader: dashboardLoader,
          },
          {
            path: 'myAds',
            element: <MyAds />,
            loader: dashboardLoader,
          },
          {
            path: 'mySavedAds',
            element: <MySavedAds />,
            loader: dashboardLoader,
          },
        ],
      },
    ],
  },
];
