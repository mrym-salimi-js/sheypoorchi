// import { lazy } from 'react';

// import PageLoading from '../components/globals/PageLoading';
import { authRoute } from './authRoute';
import { userAccountRoute } from './userAccountRoute';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import NewAd from '../pages/NewAd';
import Single from '../pages/Single';

// const Home = lazy(() => import('../pages/Home'));
// استفاده از حالت لیزی که این امکان رو میده در بارگذاری اولیه سایت همه کامپوننت ها دانلود نشن و هر کامپوننتی مکه کاربر باز کرد اونموقع باز بشه زمانی قابل استفادس که اون کامپوننت در تگ ساسپنس قرار بگیره!!!
// و از اونجایی که ساسپنس به صورت مستقیم در روت زیر استفاده نمیشه ما این امکان رو حذف کردیم

export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 's/iran/',
    element: <Home />,
  },
  {
    path: 's/iran/:category',
    element: <Home />,
  },
  {
    path: 's/iran/:category',
    element: <Home />,
  },
  {
    path: 's/iran/:category/:brand',
    element: <Home />,
  },
  {
    path: 's/iran/:category/:brand/:model',
    element: <Home />,
  },

  { path: 'newAd', element: <NewAd /> },
  { path: 'v/:id/:title', element: <Single /> },
  ...authRoute,
  ...userAccountRoute,

  { path: '*', element: <NotFound /> },
];
