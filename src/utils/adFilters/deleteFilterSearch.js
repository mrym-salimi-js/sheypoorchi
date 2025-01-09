import { navTo } from '../globals/navTo';

export function deleteFilterSearch(
  searchObject,
  searchItems,
  navigateTo,
  locationUrl
) {
  for (let key in searchObject) {
    if (key !== 'cities' && key !== 'c') {
      searchItems.delete(key);
    }
  }
  navTo(locationUrl.pathname, searchItems, navigateTo);
}
