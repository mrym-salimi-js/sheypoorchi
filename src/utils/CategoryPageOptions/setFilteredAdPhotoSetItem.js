export function setFilteredAdPhotoSetItem(key, res) {
  key.includes('wp') &&
    res.push({ id: -1, title: 'آگهی های عکس دار', slug: key });
  // setFilterItemsList((prev) => [
  //   ...prev,
  //   { id: -1, title: 'آگهی های عکس دار', slug: key },
  // ]);
}
