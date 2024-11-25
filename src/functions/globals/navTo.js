export function navTo(pathname, searchItems, navigateTo) {
  console.log(pathname);
  navigateTo({
    pathname: pathname,
    search: searchItems && searchItems.toString(),
  });
}
