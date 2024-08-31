export function navigateAfterFilter(cookie, queryParams, item, navigateTo) {
  if (cookie) {
    const cookieCitiesInUrl = encodeURIComponent(JSON.stringify(cookie));

    queryParams.set('cities', cookieCitiesInUrl);
  }

  if (item.children && item.children?.length == 0) {
    navigateTo({
      pathname: '/s/iran/' + item.slug,
      search: queryParams.toString(),
    });
  }

  if (item.name !== 'همه گروه ها') {
    navigateTo({
      pathname: '/s/iran/' + item.slug,
      search: queryParams.toString(),
    });
  } else {
    navigateTo({
      pathname: '/s/iran',
      search: queryParams.toString(),
    });
  }
}
