import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import { adsCategoriesList } from './services/adsCategoriesList';
import { lazy, Suspense, useEffect } from 'react';
import { adsLocationsList } from './services/adsLocationsList';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
// import Messages from './pages/user/Messages';
import PageLoading from './components/globals/PageLoading';
const Home = lazy(() => import('./pages/Home'));
const Single = lazy(() => import('./pages/Single'));
const NewAd = lazy(() => import('./pages/NewAd'));
// import Dashboard from './pages/user/Dashboard';
// import Profile from './pages/user/Profile';
import ProtectectedAuth from './components/ProtectectedAuth';
// import MyAds from './pages/user/MyAds';
// import MySavedAds from './pages/user/MySavedAds';
import Account from './pages/user/Account';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  useEffect(() => {
    const cats = JSON.parse(localStorage.getItem('ads_categories_list'));
    const locs = JSON.parse(localStorage.getItem('ads_locations_list'));

    const baseURL = import.meta.env.VITE_BASE_URL;

    !cats &&
      localStorage.setItem(
        'ads_categories_list',
        JSON.stringify(adsCategoriesList)
      );
    !locs &&
      localStorage.setItem(
        'ads_locations_list',
        JSON.stringify(adsLocationsList)
      );

    // local api
    const getMessages = async () => {
      const response = await fetch(`${baseURL}/api/ads/`);
      const messages = await response.json();
      // console.log(messages);
      return messages;
    };
    getMessages();
  }, []);

  // useEffect(() => {
  //   const allQK = [];
  //   adsCategoriesList.find((item) => {
  //     item.attributes?.map((attr) => {
  //       attr.queryKey !== undefined && allQK.push(attr.queryKey);
  //     });

  //     item.children?.map((itemCh) => {
  //       itemCh.attributes?.map((attrrch) => {
  //         attrrch.queryKey !== undefined && allQK.push(attrrch.queryKey);
  //       });
  //     });
  //   });
  //   const uniqueArray = new Set(allQK);
  //   console.log(uniqueArray);
  // }, [adsCategoriesList]);

  // useEffect(() => {
  //   const cats = JSON.parse(localStorage.getItem('ads_categories_list'));
  //   const locs = JSON.parse(localStorage.getItem('ads_locations_list'));

  //   // !cats &&
  //   //   axios
  //   //     .get('https://run.mocky.io/v3/3acd7fa7-fa6c-43e5-9ce7-61030b395d90')
  //   //     .then((response) => {
  //   //       localStorage.setItem('ads_categories_list', response.data);
  //   //       // response.data
  //   //     });

  //   !locs &&
  //     axios
  //       .get('https://run.mocky.io/v3/25656f7b-513f-4f81-b8bc-368eac17eb3d')
  //       .then((response) => {
  //         localStorage.setItem(
  //           'ads_locations_list',
  //           JSON.stringify(response.data)
  //         );
  //         // response.data
  //       });
  // }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}></PersistGate>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/s/iran' element={<Home />} />
              <Route
                path='/register'
                element={
                  <ProtectectedAuth path={'dashboard'}>
                    <Register />
                  </ProtectectedAuth>
                }
              />
              <Route
                path='/login'
                element={
                  <ProtectectedAuth path={'dashboard'}>
                    <Login />
                  </ProtectectedAuth>
                }
              />
              <Route path='/forgetPassword' element={<ForgetPassword />} />
              <Route path='/resetPassword/:token' element={<ResetPassword />} />
              <Route path='/s/iran?cities=:location' element={<Home />} />
              <Route
                path='/s/iran/:category?cities=:locations'
                element={<Home />}
              />
              <Route path='/s/iran/:category' element={<Home />} />
              <Route path='/s/iran/:category/:brands' element={<Home />} />
              <Route
                path='/s/iran/:category/:brands/:model'
                element={<Home />}
              />
              <Route path='/newAd' element={<NewAd />} />
              <Route path='/v/:id/:title' element={<Single />} />

              <Route
                path='/dashboard/messages'
                element={
                  <ProtectectedAuth path={'messages'}>
                    <Account />
                  </ProtectectedAuth>
                }
              />
              <Route
                path='/dashboard/messages/:adId'
                element={
                  <ProtectectedAuth path={'messages'}>
                    <Account />
                  </ProtectectedAuth>
                }
              />
              <Route
                path='/dashboard'
                element={
                  <ProtectectedAuth path={'dashboard'}>
                    <Account />
                  </ProtectectedAuth>
                }
              />
              <Route
                path='/dashboard/myProfile'
                element={
                  <ProtectectedAuth path={'myProfile'}>
                    <Account />
                  </ProtectectedAuth>
                }
              />
              <Route
                path='/dashboard/myAds'
                element={
                  <ProtectectedAuth path={'myAds'}>
                    <Account />
                  </ProtectectedAuth>
                }
              />
              <Route
                path='/dashboard/mySavedAds'
                element={
                  <ProtectectedAuth path={'mySavedAds'}>
                    <Account />
                  </ProtectectedAuth>
                }
              />

              {/* <Route path='*' element={<Home />} /> */}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
