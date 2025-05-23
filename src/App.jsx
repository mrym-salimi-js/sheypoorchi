import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import PageLoading from './components/globals/PageLoading';
import ProtectectedAuth from './components/ProtectectedAuth';
import NotFound from './pages/NotFound';
import { getUser } from './services/user/getUser';
import { getUserAds } from './services/user/getUserAds';
import { getChatContacts } from './services/user/getChatContacts';
import { getSavedAds } from './services/user/getSavedAds';
import { store, persistor } from './store/store';

const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const ForgetPassword = lazy(() => import('./pages/ForgetPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const NewAd = lazy(() => import('./pages/NewAd'));
const Single = lazy(() => import('./pages/Single'));
const Dashboard = lazy(() => import('./pages/user/Dashboard'));
const Account = lazy(() => import('./pages/user/Account'));
const Messages = lazy(() => import('./pages/user/Messages'));
const MySavedAds = lazy(() => import('./pages/user/MySavedAds'));
const MyAds = lazy(() => import('./pages/user/MyAds'));

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route
        index
        element={
          <Suspense fallback={<PageLoading />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path='register'
        element={
          <Suspense fallback={<PageLoading />}>
            <ProtectectedAuth path='dashboard'>
              <Register />
            </ProtectectedAuth>
          </Suspense>
        }
      />
      <Route
        path='login'
        element={
          <Suspense fallback={<PageLoading />}>
            <ProtectectedAuth path='dashboard'>
              <Login />
            </ProtectectedAuth>
          </Suspense>
        }
      />
      <Route
        path='forgetPassword'
        element={
          <Suspense fallback={<PageLoading />}>
            <ForgetPassword />
          </Suspense>
        }
      />
      <Route
        path='resetPassword/:token'
        element={
          <Suspense fallback={<PageLoading />}>
            <ResetPassword />
          </Suspense>
        }
      />
      <Route
        path='newAd'
        element={
          <Suspense fallback={<PageLoading />}>
            <ProtectectedAuth>
              <NewAd />
            </ProtectectedAuth>
          </Suspense>
        }
      />
      <Route
        path='v/:id/:title'
        element={
          <Suspense fallback={<PageLoading />}>
            <Single />
          </Suspense>
        }
      />
      <Route element={<ProtectectedAuth />}>
        <Route element={<Account />} loader={dashboardLoader}>
          <Route
            path='dashboard'
            element={<Dashboard />}
            loader={dashboardLoader}
          />
          <Route path='messages' element={<Messages />} />
          <Route path='messages/:adId' element={<Account />} />
          <Route path='myProfile' element={<Account />} />
          <Route path='myAds' element={<MyAds />} loader={dashboardLoader} />
          <Route
            path='mySavedAds'
            element={<MySavedAds />}
            loader={dashboardLoader}
          />
        </Route>
      </Route>
      <Route
        path='*'
        element={
          <Suspense fallback={<PageLoading />}>
            <NotFound />
          </Suspense>
        }
      />
    </Route>
  ),
  {
    basename: '/Advertising-react',
  }
);

export default function App() {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </CookiesProvider>
  );
}
