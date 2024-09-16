import { allCatSortOptions } from './categorySortOptionTyps';
import { filterSearch } from './filterSearch';

export function navigateAfterFilter(
  cookie,
  queryParams,
  item,
  navigateTo,
  lable,
  queryKey,
  locationUrl
) {
  if (cookie) {
    const cookieCitiesInUrl = encodeURIComponent(JSON.stringify(cookie));

    queryParams.set('cities', cookieCitiesInUrl);
  }

  if (item.name !== 'همه گروه ها') {
    navigateTo({
      pathname: '/s/iran/' + item.id,
      search: queryParams.toString(),
    });
  } else {
    navigateTo({
      pathname: '/s/iran',
      search: queryParams.toString(),
    });
  }

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
}
