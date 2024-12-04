import { useContext } from 'react';
import { TextFiledContext } from '../text/TextComponent';

export default function LableText() {
  const {
    inputShow,
    adLable,
    filterValue,
    itemTitle,
    inputVal,
    newAdStorageValue,
    storagePram,
  } = useContext(TextFiledContext);

  return (
    <p
      className={`w-full text-md transition-all absolute bottom-3 ${
        ((inputShow !== undefined && inputShow === adLable) ||
          filterValue ||
          itemTitle ||
          inputVal ||
          (newAdStorageValue && newAdStorageValue[storagePram]?.lable)) &&
        `mb-8 text-sm`
      }  ${inputShow === adLable && ` text-[#e4aac5]`} `}
    >
      {adLable}
    </p>
  );
}
