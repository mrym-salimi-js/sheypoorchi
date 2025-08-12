import TextComponent from '../text/TextComponent';
import { List } from './List';

export default function SingleSelected({
  label,
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
  searchItem,
}) {
  return (
    <>
      <TextComponent
        defaultItem={defaultItem}
        label={label}
        setValidation={setValidation}
        validation={validation}
        newAdStorageValue={newAdStorageValue}
        storagePram={storagePram}
        filedType={'singleSelected'}
        setOpenList={setOpenList}
        openList={openList}
        fieldVal={fieldVal}
        index={index}
        searchItem={searchItem}
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
