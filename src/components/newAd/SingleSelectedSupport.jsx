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
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    if (!selectedItem) return;
    //Delete Excludedattributes Of Category
    if (newAdStorageValue) {
      for (let key in newAdStorageValue) {
        selectedItem?.excludedAttributes?.length > 0 &&
          selectedItem?.excludedAttributes.map((ex) => {
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
      selectedItem,
      storagePram,
      basicNewAdStorage
    );

    //Category Attributes Storage Setting
    if (storagePram !== 'location') {
      setSingleSelectedAttrsStorage(
        (stateVal) => {
          setNewAdStorageValue(stateVal);
        },
        selectedItem,
        storagePram,
        setOpenList,
        newAdStorageValue
      );
    }

    selectedItem?.children?.length > 0 && setListItems(selectedItem?.children);
    selectedItem?.districts?.length > 0 &&
      setListItems(selectedItem?.districts);

    if (
      (selectedItem?.children?.length === 0 &&
        selectedItem?.brands?.length === 0) ||
      (selectedItem.children === undefined &&
        (selectedItem?.districts === undefined ||
          selectedItem?.districts?.length == 0))
    ) {
      setOpenList(false);
    }
  }, [selectedItem]);
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
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
      />
    </>
  );
}
