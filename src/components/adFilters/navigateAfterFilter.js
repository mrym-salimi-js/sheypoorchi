import { allCatSortOptions } from './categorySortOptionTyps';
import { filterSearch } from './filterSearch';

export function navigateAfterFilter(
  queryParams,
  item,
  navigateTo,
  lable,
  queryKey,
  locationUrl
) {
  if (lable === 'مرتب سازی') {
    const selctedSo = allCatSortOptions.find((soItem) => {
      return soItem.name === item.title;
    });
    const searchValue = selctedSo.slug;
    filterSearch(queryKey, searchValue, queryParams, locationUrl, navigateTo);
  } else if (lable === 'دسته بندی') {
    const searchKey = 'c';
    const searchValue = item.id;
    filterSearch(
      searchKey,
      searchValue,
      queryParams,
      locationUrl,
      navigateTo,
      item
    );
  } else {
    const queryVal = item.id;
    filterSearch(queryKey, queryVal, queryParams, locationUrl, navigateTo);
  }
  // Nav To Home Page
  if (item.name === 'همه گروه ها') {
    const searchKeys = [...queryParams.keys()];
    searchKeys.forEach((sk) => {
      queryParams.delete(sk);
    });
    navigateTo({
      pathname: '/s/iran/',
      search: queryParams.toString(),
    });
  }
}
