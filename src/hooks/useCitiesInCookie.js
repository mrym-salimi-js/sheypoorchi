export const useCitiesInCookie = (cookie) => {
  return encodeURIComponent(JSON.stringify(cookie['cities']));
};
