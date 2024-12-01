import TextComponent from '../TextComponent';
import { List } from './List';

export default function SingleSelected({
  lable,
  setNewAdStorageValue,
  newAdStorageValue,
  storagePram,
  setValidation,
  validation,
  firstItemBold,
  setOpenList,
  openList,
  itemTitle,
  listItems,
  setListItems,
  setSelectedItem,
}) {
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
          firstItemBold={firstItemBold}
          setSelectedItem={setSelectedItem}
        />
      )}
    </>
  );
}
