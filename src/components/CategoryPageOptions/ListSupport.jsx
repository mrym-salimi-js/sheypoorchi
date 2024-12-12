import { useEffect, useState } from 'react';
import { navigateAfterFilter } from '../../functions/adFilters/navigateAfterFilter';
import { List } from '../formFileds/singleSelected/List';

export default function ListSupport({
  setOpenList,
  navigateTo,
  openList,
  list,
  queryParams,
  lable,
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
    setOpenList(false);
    navigateAfterFilter(
      queryParams,
      item,
      navigateTo,
      lable,
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
  }, [filterListTitle]);

  return (
    <>
      <List
        type={type}
        lable={lable}
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
