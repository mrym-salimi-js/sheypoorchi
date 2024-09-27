import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import NewAd from './pages/NewAd';
import { adsCategoriesList } from './services/adsCategoriesList';
import { useEffect } from 'react';
import { adsLocationsList } from './services/adsLocationsList';
import Single from './pages/Single';
// import axios from 'axios';

function App() {
  useEffect(() => {
    const cats = JSON.parse(localStorage.getItem('ads_categories_list'));
    const locs = JSON.parse(localStorage.getItem('ads_locations_list'));

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
  }, []);

  useEffect(() => {
    const allQK = [];
    adsCategoriesList.find((item) => {
      item.attributes?.map((attr) => {
        attr.queryKey !== undefined && allQK.push(attr.queryKey);
      });

      item.children?.map((itemCh) => {
        itemCh.attributes?.map((attrrch) => {
          attrrch.queryKey !== undefined && allQK.push(attrrch.queryKey);
        });
      });
    });
    const uniqueArray = new Set(allQK);
    console.log(uniqueArray);
  }, [adsCategoriesList]);

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
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/s/iran' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/s/iran?cities=:location' element={<Home />} />
          <Route
            path='/s/iran/:category?cities=:locations'
            element={<Home />}
          />
          <Route path='/s/iran/:category' element={<Home />} />
          <Route path='/newAd' element={<NewAd />} />
          <Route path='/:id/:title' element={<Single />} />
          {/* <Route path='*' element={<Home />} /> */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
