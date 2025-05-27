export const useUrlSearchParam = (locationUrl) => {
  const searchParams = new URLSearchParams(locationUrl.search);
  const searchPureObj = {};
  for (const [key, value] of searchParams.entries()) {
    searchPureObj[key] = value;
  }
  return { searchParams, searchPureObj };
};
