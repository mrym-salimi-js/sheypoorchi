export function linkTo(event, navigateTo, pathname, search) {
  event.preventDefault();
  navigateTo({
    pathname: pathname,
    search: search && search,
  });
}
