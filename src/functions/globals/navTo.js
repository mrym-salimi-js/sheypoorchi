export function navTo(pathname, searchItems, navigateTo) {
  navigateTo({
    pathname: pathname,
    search: searchItems.toString(),
  });
}
