import { useContext, useEffect, useState } from 'react';
import SingleSelected from '../formFileds/singleSelected/SingleSelected';
import { NewAdContext } from './NewAdForm';
import { setParamsAfterDependencies } from '../../functions/newAd/setParamsAfterDependencies';
import { singleSelectedErrorHandling } from '../../functions/newAd/singleSelectedErrorHandling';
import { setSingleSelectedAttrsStorage } from '../../functions/newAd/setSingleSelectedAttrsStorage';
import { setSingleSelectedStorage } from '../../functions/newAd/setSingleSelectedStorage';

export default function SingleSelectedSupport({ lable, allList, storagePram }) {
  const {
    setNewAdStorageValue,
    newAdStorageValue,
    basicNewAdStorage,
    setValidation,
    validation,
  } = useContext(NewAdContext);
  const [openList, setOpenList] = useState();
  const [listItems, setListItems] = useState();

  const handleListItems = (item) => {
    if (!item) return;
    //Delete Excludedattributes Of Category
    if (newAdStorageValue) {
      for (let key in newAdStorageValue) {
        item?.excludedAttributes?.length > 0 &&
          item?.excludedAttributes.map((ex) => {
            key == ex.attributeID && delete newAdStorageValue[key];
          });
      }
    }

    //Single Slection Storage Setting
    setSingleSelectedStorage(
      (stateVal) => {
        setNewAdStorageValue(stateVal);
      },
      newAdStorageValue,
      item,
      storagePram,
      basicNewAdStorage
    );

    //Category Attributes Storage Setting
    if (storagePram !== 'location') {
      setSingleSelectedAttrsStorage(
        (stateVal) => {
          setNewAdStorageValue(stateVal);
        },
        item,
        storagePram,
        setOpenList,
        newAdStorageValue
      );
    }

    item?.children?.length > 0 && setListItems(item?.children);
    item?.districts?.length > 0 && setListItems(item?.districts);

    if (
      (item?.children?.length === 0 && item?.brands?.length === 0) ||
      (item.children === undefined &&
        (item?.districts === undefined || item?.districts?.length == 0))
    ) {
      setOpenList(false);
    }
  };

  useEffect(() => {
    setParamsAfterDependencies(
      (storageVal) => {
        setNewAdStorageValue(storageVal);
      },
      openList,
      newAdStorageValue,
      storagePram
    );

    singleSelectedErrorHandling(
      (stateVal) => {
        setValidation(stateVal);
      },
      openList,
      newAdStorageValue,
      storagePram,
      lable,
      validation
    );

    allList && setListItems(allList);
  }, [openList]);

  return (
    <>
      <SingleSelected
        lable={lable}
        listItems={listItems}
        setListItems={setListItems}
        storagePram={storagePram}
        setNewAdStorageValue={setNewAdStorageValue}
        newAdStorageValue={newAdStorageValue}
        setValidation={setValidation}
        validation={validation}
        setOpenList={setOpenList}
        openList={openList}
        handleListItems={handleListItems}
      />
    </>
  );
}
