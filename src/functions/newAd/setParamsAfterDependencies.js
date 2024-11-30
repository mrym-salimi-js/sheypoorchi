import { useEffect } from 'react';

export function setParamsAfterDependencies(
  setStorageCallback,
  openList,
  newAdStorageValue,
  storagePram
) {
  // console.log(openList);
  useEffect(() => {
    if (
      newAdStorageValue &&
      newAdStorageValue[storagePram]?.dependencies?.length > 1
    ) {
      const lat = newAdStorageValue[storagePram].dependencies[2]?.lat
        ? newAdStorageValue[storagePram].dependencies[2]?.lat
        : newAdStorageValue[storagePram].dependencies[1]?.lat;
      const lon = newAdStorageValue[storagePram].dependencies[2]?.lon
        ? newAdStorageValue[storagePram].dependencies[2]?.lon
        : newAdStorageValue[storagePram].dependencies[1]?.lon;

      setStorageCallback({
        ...newAdStorageValue,
        [`${storagePram}`]: {
          ...newAdStorageValue[`${storagePram}`],
          id: newAdStorageValue[storagePram].dependencies[1]?.id,
          lable: newAdStorageValue[storagePram].dependencies
            .map((item) => {
              return item.name;
            })
            .join(' > '),
          lat: lat,
          lon: lon,
        },
      });
      localStorage.setItem(
        'coordinate',
        JSON.stringify({ lat: lat, lon: lon })
      );
    }
  }, [openList]);
}
