import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { store, persistor } from './store/store';
import { Routes } from './routes/Routes';
import { useEffect } from 'react';
import { adsCategoriesList } from './services/adsCategoriesList';
import { adsLocationsList } from './services/adsLocationsList';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter(Routes);

export default function App() {
  // Set Locations and Categories Array In Local Storage
  useEffect(() => {
    if (!localStorage.getItem('ads_categories_list')) {
      localStorage.setItem(
        'ads_categories_list',
        JSON.stringify(adsCategoriesList)
      );
    }
    if (!localStorage.getItem('ads_locations_list')) {
      localStorage.setItem(
        'ads_locations_list',
        JSON.stringify(adsLocationsList)
      );
    }
  }, []);

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
