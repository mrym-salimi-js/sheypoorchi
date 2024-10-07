import { useEffect, useState } from 'react';

export function findProvinces() {
  const [provincesList, setProvincesList] = useState();

  useEffect(() => {
    const provinces = JSON.parse(localStorage.getItem('ads_locations_list'));
    provinces && setProvincesList(provinces);
  }, []);
  return provincesList;
}
