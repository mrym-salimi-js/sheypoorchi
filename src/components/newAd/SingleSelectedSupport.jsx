import { useContext, useEffect, useState } from 'react';
import SingleSelected from '../formFileds/singleSelected/SingleSelected';
import { NewAdContext } from './NewAdForm';
import { useDispatch } from 'react-redux';
import {
  updateCategory,
  updateLocationAfterDependencies,
  updateCategoryAfterDependencies,
  updateLocation,
  updateCategoryAttr,
} from '../../store/newAdSlice';

export default function SingleSelectedSupport({
  label,
  allList,
  storagePram,
  index,
  itemId,
  filedType,
  data,
}) {
  const { newAdStorageValue, setValidation, validation } =
    useContext(NewAdContext);
  const [openList, setOpenList] = useState('opacity-0 invisible');
  const [fieldVal, setFieldVal] = useState();
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
    if (storagePram === 'attribute' || storagePram === 'category') {
      dispatch(
        updateCategoryAttr({
          filedType,
          item,
          itemId,
        })
      );
    }

    item?.children?.length > 0 && setFieldVal(item?.children);

    item?.districts?.length > 0 && setFieldVal(item?.districts);

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
        dispatch(updateCategoryAfterDependencies());
      data.location?.dependencies?.length > 1 &&
        dispatch(updateLocationAfterDependencies());
    }

    allList != undefined && setFieldVal(allList);
  }, [openList]);

  return (
    <>
      <SingleSelected
        label={label}
        fieldVal={fieldVal}
        setFieldVal={setFieldVal}
        storagePram={storagePram}
        newAdStorageValue={newAdStorageValue}
        setValidation={setValidation}
        validation={validation}
        setOpenList={setOpenList}
        openList={openList}
        handleListItems={handleListItems}
        index={index}
      />
    </>
  );
}
