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
  fieldVal,
  listItems,
  setFieldVal,
  setListTitle,
  handleListItems,
  index,
  setListItems,
  defaultItem,
}) {
  return (
    <>
      <TextComponent
        defaultItem={defaultItem}
        label={label}
        setValidation={setValidation}
        validation={validation}
        setNewAdStorageValue={setNewAdStorageValue}
        newAdStorageValue={newAdStorageValue}
        storagePram={storagePram}
        filedType={'singleSelected'}
        setOpenList={setOpenList}
        openList={openList}
        fieldVal={fieldVal}
        index={index}
      />

      <List
        allList={listItems || fieldVal}
        setListItems={setListItems || setFieldVal}
        setFieldVal={setFieldVal}
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
