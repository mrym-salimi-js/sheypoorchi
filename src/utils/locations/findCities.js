import { useMemo } from 'react';

export function findCities(prvId) {
  const citiesList = useMemo(() => {
    let res;
    const locs = JSON.parse(localStorage.getItem('ads_locations_list'));

    locs &&
      locs.forEach((item) => {
        if (item.id == prvId) {
          res = item.children;
        }
      });

    return res;
  }, []);
  return citiesList;
}
