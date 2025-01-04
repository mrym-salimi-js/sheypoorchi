import TextComponent from '../text/TextComponent';
import { List } from './List';

export default function SingleSelected({
  label,
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
  setListTitle,
  handleListItems,
}) {
  return (
    <>
      <TextComponent
        adLabel={label}
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

      <List
        allList={listItems}
        setListItems={setListItems}
        label={label}
        setOpenList={setOpenList}
        firstItemBold={firstItemBold}
        setListTitle={setListTitle}
        handleListItems={handleListItems}
        openList={openList}
      />
    </>
  );
}
