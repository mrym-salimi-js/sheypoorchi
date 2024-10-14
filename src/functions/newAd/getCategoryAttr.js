export function getCategoriyAttr(adsCategoriesList, newAdStorageValue) {
  const catAttr = [];

  let catAttrTitle;
  let catAttrType;

  let placeHolder;
  if (newAdStorageValue?.category?.id) {
    for (let key in newAdStorageValue) {
      if (newAdStorageValue[key] === undefined) return;

      adsCategoriesList?.find((item) => {
        item?.attributes?.find((mainAttr) => {
          if (mainAttr.id == [key]) {
            (catAttrTitle = mainAttr.title), (catAttrType = mainAttr.type);
          }
        });

        item.children?.find((itemCh) => {
          itemCh.id === newAdStorageValue?.category.id &&
            ((placeHolder = itemCh.placeholders),
            itemCh.attributes.find((itemAttr) => {
              if (itemAttr.id == [key]) {
                (catAttrTitle = itemAttr.title), (catAttrType = itemAttr.type);
              }
            }));
        });
      });

      JSON.stringify(+key).length != 4 &&
        catAttr.push({
          name: catAttrTitle,
          id: +key,
          type: catAttrType,
          value: newAdStorageValue[key],
        });
    }
  }

  return { attributes: catAttr, placeholder: placeHolder };
}
