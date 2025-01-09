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
}) {
  return (
    <>
      <TextComponent
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
        allList={listItems}
        setListItems={setListItems}
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
