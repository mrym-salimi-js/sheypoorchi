export function filterSearch(
  key,
  value,
  queryParams,
  locationUrl,
  navigateTo,
  item
) {
  queryParams.set(key, value);
  if (key === 'c') {
    navigateTo({
      pathname: '/s/iran/' + item.slug,
      search: queryParams.toString(),
    });
  } else {
    navigateTo({
      pathname: locationUrl.pathname,
      search: queryParams.toString(),
    });
  }
}
