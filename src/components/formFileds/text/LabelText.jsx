import { useContext } from 'react';
import { TextFiledContext } from './TextComponent';

export default function LabelText() {
  const {
    inputShow,
    adLabel,
    filterValue,
    itemTitle,
    inputVal,
    newAdStorageValue,
    storagePram,
  } = useContext(TextFiledContext);
  return (
    <p
      className={`w-full text-md transition-all absolute bottom-3 ${
        ((inputShow !== undefined && inputShow === adLabel) ||
          filterValue ||
          itemTitle ||
          inputVal ||
          (newAdStorageValue && newAdStorageValue[storagePram]?.label)) &&
        `mb-8 text-sm`
      }  ${inputShow === adLabel && ` text-[#e4aac5]`} `}
    >
      {adLabel}
    </p>
  );
}
