import { navTo } from '../globals/navTo';
import { allCatSortOptions } from './categorySortOptionTyps';

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
    queryParams.set('o', selctedSo.slug);
    navTo(locationUrl.pathname, queryParams, navigateTo);
  } else if (lable === 'دسته بندی') {
    queryParams.set('c', item.id);
    navTo(`/s/iran/${item.slug}`, queryParams, navigateTo);
  } else {
    queryParams.set(queryKey, item.id);
    navTo(`/s/iran/${item.slug}`, queryParams, navigateTo);
  }
  // Nav To Home Page
  if (item.name === 'همه گروه ها') {
    const searchKeys = [...queryParams.keys()];
    searchKeys.forEach((sk) => {
      queryParams.delete(sk);
    });
    navTo('/s/iran', queryParams, navigateTo);
  }
}
