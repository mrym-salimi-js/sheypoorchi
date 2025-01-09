export function setFilteredItems(key, res, id, item) {
  if (key.startsWith('mn')) {
    res.push({ id: id, title: `حداقل  ${item.title}`, slug: key });
    // setFilterItemsList((prev) => [
    //   ...prev,
    //   { id: id, title: `حداقل  ${item.title}`, slug: key },
    // ]);
  } else if (key.startsWith('mx')) {
    res.push({ id: id, title: `حداکثر  ${item.title}`, slug: key });
    // setFilterItemsList((prev) => [
    //   ...prev,
    //   { id: id, title: `حداکثر  ${item.title}`, slug: key },
    // ]);
  } else {
    res.push({ id: id, title: `${item.title}`, slug: key });
    // setFilterItemsList((prev) => [
    //   ...prev,
    //   { id: id, title: `${item.title}`, slug: key },
    // ]);
  }
}
