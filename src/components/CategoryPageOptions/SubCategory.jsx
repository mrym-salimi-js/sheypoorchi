import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeContext } from '../../pages/Home';
import { scrollSlider } from '../../utils/globals/scrollSlider';
import { CategoryPageContext } from '../CategoryPageDetails';

export function SubCategory() {
  const { category, brand, searchParams } = useContext(HomeContext);
  const { computeCatList } = useContext(CategoryPageContext);

  const navigateTo = useNavigate();

  const handleScrollItems = () => [
    scrollSlider(document.querySelectorAll('.sub-cat-items-box')),
  ];

  const handleShowFilterItem = (filterItem, event) => {
    event.preventDefault();

    filterItem.slug !== undefined
      ? navigateTo({
          pathname: `/s/iran/${filterItem.slug}`,
          search: searchParams && searchParams.toString(),
        })
      : navigateTo({
          pathname: `/s/iran/${category}/${brand}/${filterItem?.name}`,
          search: searchParams && searchParams.toString(),
        });
  };

  return (
    <div
      onClick={handleScrollItems}
      className='sub-cat-items-box w-full h-auto bg-gray-50  border-b-[1px] border-t-[1px]'
    >
      <ul className='w-auto  flex overflow-x-scroll  m-0 py-1 '>
        {computeCatList?.subCategory?.map((item) => {
          return (
            <li
              className='min-w-auto flex flex-col items-center gap-2  '
              key={item.id}
            >
              <a
                href={
                  item.slug !== undefined
                    ? `/s/iran/${item.slug}`
                    : `/s/iran/${category}/${brand}/${item.name}`
                }
                onClick={(event) => handleShowFilterItem(item, event)}
                className='w-full p-2  rounded-3xl cursor-pointer flex flex-col gap-3 justify-center items-center'
              >
                <p className='text-[#84105C] text-[0.8rem] py-1 px-2 text-center text-nowrap'>
                  {item.name}
                </p>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
