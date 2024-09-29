import { useLocation } from 'react-router-dom';
import { setSingleSelectedStorage } from '../../newAd/formFunctions/setSingleSelectedStorage';
import { setSingleSelectedAttrsStorage } from '../../newAd/formFunctions/setSingleSelectedAttrsStorage';
import { ChevronLeft } from '../../globals/Icons';
import { navigateAfterFilter } from '../../adFilters/navigateAfterFilter';

export function ListItems({
  list,
  setListItems,
  setLastList,
  setListType,
  setNewAdStorageValue,
  newAdStorageValue,
  storagePram,
  setOpenList,
  basicNewAdStorage,
  setItemTitle,
  type,
  setFilterListTitle,
  navigateTo,
  lable,
  queryKey,
  firstItemBold,
}) {
  // Get Current Url For Filter Type
  const locationUrl = useLocation();
  const queryParams = new URLSearchParams(locationUrl.search);

  const handleItems = (item) => {
    // Filter Form Settings
    if (type === 'filter' || type === 'category_search') {
      // Navigate After ad Filter Param in url
      navigateAfterFilter(
        queryParams,
        item,
        navigateTo,
        lable,
        queryKey,
        locationUrl
      );

      // Set Title (value or name) Of Selected Item For Showing In Filter Filed
      type === 'filter' && setItemTitle(item.title ? item.title : item.name);

      // Set Title Of List Items (like titr)
      if (lable === 'دسته بندی') {
        setFilterListTitle({
          name: item.title ? item.title : item.name,
          slug: item.slug,
          id: item.id,
        });
      }
    }

    // List Of Items
    item.children?.length > 0 && setListItems(item.children),
      setListType('sub'),
      setLastList(list);
    item.districts?.length > 0 && setListItems(item.districts);
    item.brands?.length > 0 &&
      type !== 'filter' &&
      type !== 'category_search' &&
      setListItems(item.brands);

    //Delete Excludedattributes Of Category
    if (newAdStorageValue) {
      for (let key in newAdStorageValue) {
        item.excludedAttributes?.length > 0 &&
          item.excludedAttributes.map((ex) => {
            key == ex.attributeID && delete newAdStorageValue[key];
          });
      }
    }

    //Single Slection Storage Setting
    if (storagePram) {
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

      setSingleSelectedAttrsStorage(
        (stateVal) => {
          setNewAdStorageValue(stateVal);
        },
        item,
        storagePram,
        setOpenList
      );
    }

    //Close List Box
    if (
      (item.children?.length == 0 && item.brands?.length == 0) ||
      (item.children === undefined &&
        (item.districts === undefined || item.districts?.length == 0)) ||
      ((type === 'filter' || type === 'category_search') &&
        item.brands?.length > 0)
    ) {
      setOpenList(false);
    }
  };

  return list?.map((item, index) => {
    return (
      <li
        onClick={() => handleItems(item)}
        className='cursor-pointer border-t pb-4 pt-4 flex justify-between items-center '
        key={index}
      >
        <p
          className={`text-sm  ${
            firstItemBold && index == 0 ? `text-black` : `text-gray-500`
          }`}
        >
          {item.name ? item.name : item.title}
        </p>

        {(() => {
          if (
            item.children?.length > 0 ||
            item.districts?.length > 0 ||
            (item.brands?.length > 0 &&
              type !== 'filter' &&
              type !== 'category_search')
          ) {
            return (
              <ChevronLeft
                color={'#000000'}
                size={'size-4'}
                strokeWidth={2.4}
              />
            );
          }
        })()}
      </li>
    );
  });
}
