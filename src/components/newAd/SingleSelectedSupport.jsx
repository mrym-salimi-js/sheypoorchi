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
  setParamsAfterDependencies(
    (storageVal) => {
      setNewAdStorageValue(storageVal);
    },
    openList,
    newAdStorageValue,
    storagePram
  );
  // singleSelectedErrorHandling(
  //   (stateVal) => {
  //     setValidation(stateVal);
  //   },
  //   openList,
  //   newAdStorageValue,
  //   storagePram,
  //   lable,
  //   validation
  // );

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
  }, [selectedItem]);
  useEffect(() => {
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
        basicNewAdStorage={basicNewAdStorage}
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
