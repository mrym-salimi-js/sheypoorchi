import { useContext, useEffect, useState } from 'react';
import SingleSelected from '../formFileds/singleSelected/SingleSelected';
import { navigateAfterFilter } from '../../functions/adFilters/navigateAfterFilter';
import { useLocation, useParams } from 'react-router-dom';
import { FilterContext } from './MainFields';

export default function SingleSelectedSupport({
  lable,
  allList,
  defaultItem,
  queryKey,
}) {
  const { navigateTo } = useContext(FilterContext);
  const [openList, setOpenList] = useState('opacity-0 invisible');
  const [listItems, setListItems] = useState([]);
  const [fieldVal, setFieldVal] = useState();
  const [filterListTitle, setFilterListTitle] = useState();
  const params = useParams();

  const locationUrl = useLocation();
  const queryParams = new URLSearchParams(locationUrl.search);

  const handleListItems = (item) => {
    if (!item) return;

    navigateAfterFilter(
      queryParams,
      item,
      navigateTo,
      lable,
      queryKey,
      locationUrl,
      params
    );

    // Set Title (value or name) Of Selected Item For Showing In Filter Filed
    setFieldVal(item?.title ? item?.title : item?.name);

    // Set Title Of List Items (like titr)
    if (lable === 'دسته بندی') {
      setFilterListTitle({
        name: item?.title ? item?.title : item?.name,
        slug: item?.slug,
        id: item?.id,
      });
    }

    item?.brands?.length > 0 && setListItems(item.brands);
    item?.children?.length > 0 && setListItems(item?.children);
    item?.districts?.length > 0 && setListItems(item?.districts);

    if (
      (item?.children?.length === 0 && item?.brands?.length === 0) ||
      (item?.children === undefined &&
        (item?.districts === undefined || item?.districts?.length == 0)) ||
      item?.brands?.length > 0
    ) {
      setOpenList('opacity-0 invisible');
    }
  };

  useEffect(() => {
    defaultItem && setFieldVal(defaultItem);
  }, [defaultItem]);

  // Set List Title Of Filter And ListItems
  useEffect(() => {
    setFilterListTitle({ name: 'همه گروه ها', slug: '', id: '' });

    allList && setListItems(allList);
  }, [openList]);
  return (
    <>
      <SingleSelected
        lable={lable}
        listItems={
          lable === 'دسته بندی' ? [filterListTitle, ...listItems] : listItems
        }
        defaultItem={defaultItem}
        type={'filter'}
        firstItemBold={true}
        setOpenList={setOpenList}
        openList={openList}
        fieldVal={fieldVal}
        setListItems={setListItems}
        setListTitle={setFilterListTitle}
        handleListItems={handleListItems}
      />
    </>
  );
}
