import { useContext, useEffect, useMemo, useState } from 'react';
import SingleSelected from '../formFileds/singleSelected/SingleSelected';
import { navigateAfterFilter } from '../../functions/adFilters/navigateAfterFilter';
import { useLocation } from 'react-router-dom';
import { FilterContext } from './MainFields';

export default function SingleSelectedSupport({
  lable,
  allList,
  defaultItem,
  queryKey,
}) {
  const { navigateTo } = useContext(FilterContext);
  const [openList, setOpenList] = useState();
  const [listItems, setListItems] = useState();
  const [itemTitle, setItemTitle] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [filterListTitle, setFilterListTitle] = useState();
  // Set DefaultItem Of Filter Filed By Every Updating

  const locationUrl = useLocation();
  const queryParams = new URLSearchParams(locationUrl.search);
  useEffect(() => {
    navigateAfterFilter(
      queryParams,
      selectedItem,
      navigateTo,
      lable,
      queryKey,
      locationUrl
    );

    // Set Title (value or name) Of Selected Item For Showing In Filter Filed
    setItemTitle(
      selectedItem?.title ? selectedItem?.title : selectedItem?.name
    );

    // Set Title Of List Items (like titr)
    if (lable === 'دسته بندی') {
      setFilterListTitle({
        name: selectedItem?.title ? selectedItem?.title : selectedItem?.name,
        slug: selectedItem?.slug,
        id: selectedItem?.id,
      });
    }
  }, [selectedItem]);
  useMemo(() => {
    defaultItem && setItemTitle(defaultItem);
  }, [defaultItem]);

  // Set List Title Of Filter And ListItems
  useEffect(() => {
    setFilterListTitle({ name: 'همه گروه ها', slug: '', id: '' });

    allList &&
      setListItems(
        filterListTitle !== undefined ? [filterListTitle, ...allList] : allList
      );
  }, [openList]);
  // console.log(filterListTitle);
  return (
    <>
      <SingleSelected
        lable={lable}
        listItems={listItems}
        defaultItem={defaultItem}
        type={'filter'}
        navigateTo={navigateTo}
        queryKey={queryKey}
        firstItemBold={true}
        setOpenList={setOpenList}
        openList={openList}
        itemTitle={itemTitle}
        setListItems={setListItems}
        setSelectedItem={setSelectedItem}
      />
    </>
  );
}
