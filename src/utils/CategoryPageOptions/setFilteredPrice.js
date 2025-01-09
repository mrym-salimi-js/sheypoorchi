export function setFilteredPrice(key, res) {
  key.includes('mxp') && res.push({ id: 0, title: 'حداکثر قیمت', slug: key });
  // setFilterItemsList((prev) => [
  //   ...prev,
  //   { id: 0, title: 'حداکثر قیمت', slug: key },
  // ]);
  key.includes('mnp') && res.push({ id: 0, title: 'حداقل قیمت', slug: key });
  // setFilterItemsList((prev) => [
  //   ...prev,
  //   { id: 0, title: 'حداقل قیمت', slug: key },
  // ]);
}
