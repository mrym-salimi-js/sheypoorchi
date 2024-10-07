import TextComponent from '../TextComponent';
import { setParamsAfterDependencies } from '../../../functions/newAd/setParamsAfterDependencies';
import { singleSelectedErrorHandling } from '../../../functions/newAd/singleSelectedErrorHandling';
import { useEffect, useMemo, useState } from 'react';
import { List } from './List';

export default function SingleSelected({
  lable,
  allList,
  setNewAdStorageValue,
  newAdStorageValue,
  storagePram,
  setValidation,
  validation,
  basicNewAdStorage,
  queryKey,
  defaultItem,
  type,
  navigateTo,
  firstItemBold,
}) {
  const [openList, setOpenList] = useState();
  const [listItems, setListItems] = useState();
  const [itemTitle, setItemTitle] = useState();

  const [filterListTitle, setFilterListTitle] = useState();

  // Set DefaultItem Of Filter Filed By Every Updating
  useMemo(() => {
    defaultItem && setItemTitle(defaultItem);
  }, [defaultItem]);

  // Set List Title Of Filter And ListItems
  useEffect(() => {
    setFilterListTitle({ name: 'همه گروه ها', slug: '', id: '' });

    allList && setListItems(allList);
  }, [openList]);

  setParamsAfterDependencies(
    (storageVal) => {
      setNewAdStorageValue(storageVal);
    },
    openList,
    newAdStorageValue,
    storagePram
  );

  singleSelectedErrorHandling(
    (stateVal) => {
      setValidation(stateVal);
    },
    openList,
    newAdStorageValue,
    storagePram,
    lable,
    validation
  );

  return (
    <>
      <TextComponent
        adLable={lable}
        setValidation={setValidation}
        validation={validation}
        setNewAdStorageValue={setNewAdStorageValue}
        newAdStorageValue={newAdStorageValue}
        storagePram={storagePram}
        filedType={'singleSelected'}
        setOpenList={setOpenList}
        openList={openList}
        itemTitle={itemTitle}
      />

      {openList && (
        <List
          allList={listItems}
          setListItems={setListItems}
          lable={lable}
          setOpenList={setOpenList}
          setNewAdStorageValue={setNewAdStorageValue}
          newAdStorageValue={newAdStorageValue}
          storagePram={storagePram}
          basicNewAdStorage={basicNewAdStorage}
          setItemTitle={setItemTitle}
          type={type}
          setFilterListTitle={setFilterListTitle}
          filterListTitle={filterListTitle}
          navigateTo={navigateTo}
          queryKey={queryKey}
          firstItemBold={firstItemBold}
        />
      )}
    </>
  );
}
