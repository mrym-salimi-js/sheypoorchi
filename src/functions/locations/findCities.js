import { useEffect, useState } from 'react';

export function findCities(prvId) {
  const [citiesList, setCitiesList] = useState();

  useEffect(() => {
    const locs = JSON.parse(localStorage.getItem('ads_locations_list'));

    locs &&
      locs.map((item) => {
        if (item.id == prvId) {
          setCitiesList(item.children);
        }
      });
  }, []);

  return citiesList;
}
