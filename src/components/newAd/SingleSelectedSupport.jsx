import { useContext, useEffect, useState } from 'react';
import SingleSelected from '../formFileds/singleSelected/SingleSelected';
import { NewAdContext } from './NewAdForm';
import { singleSelectedErrorHandling } from '../../functions/newAd/singleSelectedErrorHandling';
import { setSingleSelectedAttrsStorage } from '../../functions/newAd/setSingleSelectedAttrsStorage';
import { useDispatch } from 'react-redux';
import {
  updateCategory,
  updateLocationAfterDependencies,
  updateCategoryAfterDependencies,
  updateLocation,
  updateCategoryAttr,
} from '../../store/newAdSlice';

export default function SingleSelectedSupport({ label, allList, storagePram }) {
  const {
    setNewAdStorageValue,
    newAdStorageValue,
    setValidation,
    validation,
    data,
  } = useContext(NewAdContext);
  const [openList, setOpenList] = useState('opacity-0 invisible');
  const [listItems, setListItems] = useState();
  const dispatch = useDispatch();

  const handleListItems = (item) => {
    if (!item) return;
    //Delete Excludedattributes Of Category
    // if (newAdStorageValue) {
    //   for (let key in newAdStorageValue) {
    //     item?.excludedAttributes?.length > 0 &&
    //       item?.excludedAttributes.map((ex) => {
    //         key == ex.attributeID && delete newAdStorageValue[key];
    //       });
    //   }
    // }

    //Single Slection Storage Setting
    if (storagePram === 'category') {
      dispatch(
        updateCategory({
          item,
        })
      );
    }
    if (storagePram === 'location') {
      dispatch(
        updateLocation({
          item,
        })
      );
    }
    if (storagePram !== 'location') {
      dispatch(
        updateCategoryAttr({
          item,
          storagePram,
        })
      );
    }

    //Category Attributes Storage Setting

    // setSingleSelectedAttrsStorage(
    //   (stateVal) => {
    //     setNewAdStorageValue(stateVal);
    //   },
    //   item,
    //   storagePram,
    //   setOpenList,
    //   newAdStorageValue
    // );

    item?.children?.length > 0 && setListItems(item?.children);

    item?.districts?.length > 0 && setListItems(item?.districts);

    if (
      item?.children?.length === 0 ||
      (item?.children === undefined &&
        (item?.districts === undefined || item?.districts?.length == 0))
    ) {
      setOpenList('opacity-0 invisible');
    }
  };

  useEffect(() => {
    if (data) {
      data.category?.dependencies?.length > 1 &&
        dispatch(updateCategoryAfterDependencies({ data }));
      data.location?.dependencies?.length > 1 &&
        dispatch(updateLocationAfterDependencies({ data }));
    }

    singleSelectedErrorHandling(
      (stateVal) => {
        setValidation(stateVal);
      },
      openList,
      newAdStorageValue,
      storagePram,
      label,
      validation
    );

    allList != undefined && setListItems(allList);
  }, [openList]);

  return (
    <>
      <SingleSelected
        label={label}
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
