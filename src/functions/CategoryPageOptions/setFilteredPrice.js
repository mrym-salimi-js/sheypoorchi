export function setFilteredPrice(key, setFilterItemsList) {
  key.includes('mxp') &&
    setFilterItemsList((prev) => [
      ...prev,
      { id: 0, title: 'حداکثر قیمت', slug: key },
    ]);
  key.includes('mnp') &&
    setFilterItemsList((prev) => [
      ...prev,
      { id: 0, title: 'حداقل قیمت', slug: key },
    ]);
}
