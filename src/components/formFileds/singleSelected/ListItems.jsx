import { ChevronLeft } from '../../globals/Icons';
export function ListItems({
  list,
  setLastList,
  setListType,
  firstItemBold,
  type,
  handleListItems,
}) {
  const handleItems = (item) => {
    item.children?.length > 0 && setListType('sub'), setLastList(list);
  };
  // before start map cycle, first filter null item
  return list
    ?.filter((i) => {
      return i;
    })
    ?.map((item, index) => {
      if (!item) return;
      return (
        <li
          onClick={() => {
            handleItems(item), handleListItems(item);
          }}
          className='cursor-pointer border-r-2 border-pink-400 p-3  flex justify-between items-center '
          key={index}
          data-index={index}
        >
          <p
            className={`text-sm  ${
              firstItemBold && index == 0 ? `text-black` : `text-gray-500`
            }`}
          >
            {item?.name ? item?.name : item?.title}
          </p>

          {(() => {
            if (
              (item?.children?.length > 0 || item.districts?.length > 0) &&
              type !== 'categorySearch'
            ) {
              return <ChevronLeft color={'#000000'} size={'size-5'} />;
            }
          })()}
        </li>
      );
    });
}
