import TextComponent from '../TextComponent';
import { List } from './List';

export default function SingleSelected({
  lable,
  setNewAdStorageValue,
  newAdStorageValue,
  storagePram,
  setValidation,
  validation,
  basicNewAdStorage,
  queryKey,
  type,
  navigateTo,
  firstItemBold,
  setOpenList,
  openList,
  itemTitle,
  listItems,
  setListItems,
  setSelectedItem,
}) {
  // console.log(openList);
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
          type={type}
          // setFilterListTitle={setFilterListTitle}
          // filterListTitle={filterListTitle}
          navigateTo={navigateTo}
          queryKey={queryKey}
          firstItemBold={firstItemBold}
          setSelectedItem={setSelectedItem}
        />
      )}
    </>
  );
}
