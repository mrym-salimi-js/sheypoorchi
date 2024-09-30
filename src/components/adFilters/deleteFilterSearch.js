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

  navigateTo({
    pathname: locationUrl.pathname,
    search: searchItems.toString(),
  });
}
