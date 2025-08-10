import { useEffect, useState } from 'react';
import { navigateAfterFilter } from '../../utils/adFilters/navigateAfterFilter';
import { List } from '../formFileds/singleSelected/List';

export default function ListSupport({
  setOpenList,
  navigateTo,
  openList,
  list,
  queryParams,
  label,
  locationUrl,
  queryKey,
  setSelectedItem,
  type,
}) {
  const [listItems, setListItems] = useState();
  const [filterListTitle, setFilterListTitle] = useState();

  const handleListItems = (item) => {
    if (!item) return;
    setSelectedItem(item);
    // Navigate After ad Filter Param in url
    setOpenList('opacity-0 invisible');
    navigateAfterFilter(
      queryParams,
      item,
      navigateTo,
      label,
      queryKey,
      locationUrl
    );
  };

  useEffect(() => {
    type === 'categorySearch' &&
      setFilterListTitle({ name: 'همه گروه ها', slug: '', id: '' });
  }, [openList]);

  useEffect(() => {
    if (list && openList) {
      filterListTitle
        ? setListItems([filterListTitle, ...list])
        : setListItems(list);
    }
  }, [filterListTitle, openList]);

  return (
    <>
      <List
        type={type}
        label={label}
        allList={listItems}
        setListItems={setListItems}
        setOpenList={setOpenList}
        firstItemBold={true}
        handleListItems={handleListItems}
        openList={openList}
      />
    </>
  );
}
