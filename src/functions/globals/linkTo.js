export function linkTo(locationUrl, event, navigateTo, pathname, search) {
  // Set Last Url In LocalStorage Before Change Url
  localStorage.setItem('last-url-pathname', locationUrl.pathname);
  localStorage.setItem('last-url-search', locationUrl.search);

  event.preventDefault();
  navigateTo({
    pathname: pathname,
    search: search && search,
  });
}
