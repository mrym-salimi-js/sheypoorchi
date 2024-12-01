import { ChevronLeft } from '../../globals/Icons';

export function ListItems({
  list,
  setLastList,
  setListType,
  firstItemBold,
  setSelectedItem,
  type,
}) {
  const handleItems = (item) => {
    // Filter Form Settings
    setSelectedItem(item);

    // List Of Items
    item.children?.length > 0 && setListType('sub'), setLastList(list);
  };

  return list?.map((item, index) => {
    return (
      <li
        onClick={() => handleItems(item)}
        className='cursor-pointer border-t pb-4 pt-4 flex justify-between items-center '
        key={index}
      >
        <p
          className={`text-sm  ${
            firstItemBold && index == 0 ? `text-black` : `text-gray-500`
          }`}
        >
          {item.name ? item.name : item.title}
        </p>

        {(() => {
          if (
            (item.children?.length > 0 || item.districts?.length > 0) &&
            type !== 'categorySearch'
          ) {
            return (
              <ChevronLeft
                color={'#000000'}
                size={'size-4'}
                strokeWidth={2.4}
              />
            );
          }
        })()}
      </li>
    );
  });
}
