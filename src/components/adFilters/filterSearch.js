export function filterSearch(key, value, queryParams, locationUrl, navigateTo) {
  queryParams.set(key, value);
  navigateTo({
    pathname: locationUrl.pathname,
    search: queryParams.toString(),
  });
}
