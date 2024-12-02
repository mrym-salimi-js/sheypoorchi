export function setFilteredItems(key, setFilterItemsList, id, item) {
  if (key.startsWith('mn')) {
    setFilterItemsList((prev) => [
      ...prev,
      { id: id, title: `حداقل  ${item.title}`, slug: key },
    ]);
  } else if (key.startsWith('mx')) {
    setFilterItemsList((prev) => [
      ...prev,
      { id: id, title: `حداکثر  ${item.title}`, slug: key },
    ]);
  } else {
    setFilterItemsList((prev) => [
      ...prev,
      { id: id, title: `${item.title}`, slug: key },
    ]);
  }
}
