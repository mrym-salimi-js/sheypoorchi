export function setFilteredAdPhotoSetItem(key, setFilterItemsList) {
  key.includes('wp') &&
    setFilterItemsList((prev) => [
      ...prev,
      { id: -1, title: 'آگهی های عکس دار', slug: key },
    ]);
}
