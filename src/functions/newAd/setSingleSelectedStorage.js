export function setSingleSelectedStorage(
  setStorageCallback,
  newAdStorageValue,
  item,
  storagePram,
  basicNewAdStorage
) {
  if (storagePram === 'location' || storagePram === 'category') {
    item.children?.length > 0
      ? setStorageCallback(
          storagePram === 'category'
            ? {
                ...basicNewAdStorage,
                [`${storagePram}`]: {
                  ...basicNewAdStorage[`${storagePram}`],

                  dependencies: [
                    ...basicNewAdStorage[`${storagePram}`]?.dependencies,
                    { id: item.id, name: item.name, slug: item.slug },
                  ],
                },

                location: newAdStorageValue.location,
                description: newAdStorageValue.description,
                title: newAdStorageValue.title,
                photo: newAdStorageValue.photo,
                userType: newAdStorageValue.userType,
              }
            : {
                ...newAdStorageValue,
                [`${storagePram}`]: {
                  ...basicNewAdStorage[`${storagePram}`],

                  dependencies: [
                    ...basicNewAdStorage[`${storagePram}`].dependencies,
                    {
                      id: item.id,
                      name: item.name,
                      lat: item.lat,
                      lon: item.lon,
                      slug: item.slug,
                    },
                  ],
                },
              }
        )
      : setStorageCallback({
          ...newAdStorageValue,
          [`${storagePram}`]: {
            ...newAdStorageValue[`${storagePram}`],

            dependencies: [
              ...newAdStorageValue[`${storagePram}`].dependencies,
              {
                id: item.id,
                name: item.name,
                slug: item.slug,
                lat: item.lat,
                lon: item.lon,
              },
            ],
          },
        });

    // setOpenList(false)
  }
}
