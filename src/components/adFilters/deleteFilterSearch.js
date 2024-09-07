export function deleteFilterSearch(
  searchItems,
  queryKey,
  navigateTo,
  locationUrl
) {
  searchItems.delete(queryKey);
  navigateTo({
    pathname: locationUrl.pathname,
    search: searchItems.toString(),
  });
}
