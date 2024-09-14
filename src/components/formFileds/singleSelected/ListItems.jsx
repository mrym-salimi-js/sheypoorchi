import { useLocation } from 'react-router-dom';
import { setSingleSelectedStorage } from '../../newAd/formFunctions/setSingleSelectedStorage';
import { setSingleSelectedAttrsStorage } from '../../newAd/formFunctions/setSingleSelectedAttrsStorage';
import { ChevronLeft } from '../../globals/Icons';
import { navigateAfterFilter } from '../../adFilters/navigateAfterFilter';
import { filterSearch } from '../../adFilters/filterSearch';
import { allCatSortOptions } from '../../adFilters/categorySortOptionTyps';

export function ListItems({
  list,
  setListItems,
  setListId,
  setListType,
  setNewAdStorageValue,
  newAdStorageValue,
  storagePram,
  setOpenList,
  basicNewAdStorage,
  setItemTitle,
  type,
  setFilterListTitle,
  cookie,
  navigateTo,
  lable,
  queryKey,
}) {
  // Get Current Url For Filter Type
  const locationUrl = useLocation();
  const queryParams = new URLSearchParams(locationUrl.search);

  const handleItems = (item) => {
    // Filter Form Settings
    if (type === 'filter') {
      navigateAfterFilter(cookie, queryParams, item, navigateTo);
      setItemTitle(item.title ? item.title : item.name);
      setFilterListTitle({
        name: item.title ? item.title : item.name,
        slug: item.slug,
      });

      // Add Filter Into Url
      if (lable === 'مرتب سازی') {
        const selctedSo = allCatSortOptions.find((soItem) => {
          return soItem.name === item.title;
        });
        const searchValue = selctedSo.slug;
        filterSearch(
          queryKey,
          searchValue,
          queryParams,
          locationUrl,
          navigateTo
        );
      } else if (lable === 'دسته بندی') {
        const searchKey = 'c';
        const searchValue = item.id;
        filterSearch(
          searchKey,
          searchValue,
          queryParams,
          locationUrl,
          navigateTo
        );
      } else {
        const queryVal = item.id;
        filterSearch(queryKey, queryVal, queryParams, locationUrl, navigateTo);
      }
    }

    // List Of Items
    item.children?.length > 0 && setListItems(item.children);
    item.districts?.length > 0 && setListItems(item.districts);
    item.brands?.length > 0 && type !== 'filter' && setListItems(item.brands);

    //Delete Excludedattributes Of Category
    if (newAdStorageValue) {
      for (let key in newAdStorageValue) {
        item.excludedAttributes?.length > 0 &&
          item.excludedAttributes.map((ex) => {
            key == ex.attributeID && delete newAdStorageValue[key];
          });
      }
    }

    if (storagePram) {
      //Single Slection Storage Setting
      setSingleSelectedStorage(
        (stateVal) => {
          setNewAdStorageValue(stateVal);
        },
        newAdStorageValue,
        item,
        storagePram,
        basicNewAdStorage,
        setListId,
        setListType,
        setOpenList
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
      (type === 'filter' && item.brands?.length > 0)
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
            type === 'filter' && index == 0 ? `text-black` : `text-gray-500`
          }`}
        >
          {item.name ? item.name : item.title}
        </p>

        {(() => {
          if (
            item.children?.length > 0 ||
            item.districts?.length > 0 ||
            (item.brands?.length > 0 && type !== 'filter')
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
