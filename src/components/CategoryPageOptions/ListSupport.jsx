import { useEffect, useState } from 'react';
import { navigateAfterFilter } from '../../functions/adFilters/navigateAfterFilter';
import { List } from '../formFileds/singleSelected/List';

export default function ListSupport({
  setOpenList,
  navigateTo,
  openList,
  mainCats,
  queryParams,
  lable,
  locationUrl,
  queryKey,
}) {
  const [listItems, setListItems] = useState();
  const [filterListTitle, setFilterListTitle] = useState();
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    if (!selectedItem) return;
    // Navigate After ad Filter Param in url
    setOpenList(false);
    navigateAfterFilter(
      queryParams,
      selectedItem,
      navigateTo,
      lable,
      queryKey,
      locationUrl
    );
  }, [selectedItem]);

  useEffect(() => {
    setFilterListTitle({ name: 'همه گروه ها', slug: '', id: '' });
  }, [openList]);
  useEffect(() => {
    mainCats &&
      filterListTitle &&
      openList &&
      setListItems([filterListTitle, ...mainCats]);
  }, [filterListTitle]);
  return (
    <>
      <List
        type={'categorySearch'}
        lable={lable}
        allList={listItems}
        setListItems={setListItems}
        setOpenList={setOpenList}
        firstItemBold={true}
        setSelectedItem={setSelectedItem}
      />
    </>
  );
}
