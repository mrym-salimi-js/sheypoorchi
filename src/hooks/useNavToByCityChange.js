// hooks/useSyncCitiesWithUrl.js

import { useEffect } from 'react';
import { useCitiesInCookie } from './useCitiesInCookie';

export const useNavToByCityChange = ({
  cookie,
  locationUrl,
  searchParams,
  navigateTo,
  navTo,
}) => {
  const cookieCitiesInUrl = useCitiesInCookie(cookie);
  useEffect(() => {
    if (cookie['cities'] !== undefined && cookie['cities'].length > 0) {
      searchParams.set('cities', cookieCitiesInUrl);
      navTo(locationUrl.pathname, searchParams, navigateTo);
    } else {
      searchParams.delete('cities');
      const pathName = !locationUrl.pathname.includes('/s/iran')
        ? 's/iran'
        : locationUrl.pathname;
      navTo(pathName, searchParams, navigateTo);
    }
  }, [cookieCitiesInUrl]);
};
