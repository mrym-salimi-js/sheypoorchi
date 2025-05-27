import { useContext, useMemo } from 'react';
import { useMainCats } from '../../hooks/useMainCats';
import { useNavigate } from 'react-router-dom';
import { HomeContext } from '../../pages/Home';
import { scrollSlider } from '../../utils/globals/scrollSlider';

export function SubCategory() {
  const { category, brands, model, locationUrl, searchParams } =
    useContext(HomeContext);
  // const [catList, setCatList] = useState();
  const mainCategories = useMainCats();
  const navigateTo = useNavigate();

  const handleScrollItems = () => [
    scrollSlider(document.querySelectorAll('.sub-cat-items-box')),
  ];

  // Get Cat Items
  const computeCatList = useMemo(() => {
    if (mainCategories === undefined) return;
    let res = null;
    mainCategories.map((item) => {
      item.slug === category && (res = item.children);

      item.children?.map((chItem) => {
        chItem.slug === category && (res = chItem.brands);

        chItem.brands?.map((bItem) => {
          if (bItem.slug === `${category}/${brands}`) {
            bItem.attributes.length > 0
              ? bItem.attributes?.map((bAttrItem) => {
                  res = bAttrItem.options;
                })
              : (res = []);
          }
          if (
            locationUrl.pathname ===
            `/s/iran/${category}/${brands}/${encodeURI(model)}`
          ) {
            res = [];
          }
        });
      });
    });
    return res;
  }, [locationUrl]);

  const handleShowFilterItem = (filterItem, event) => {
    event.preventDefault();

    filterItem.slug !== undefined
      ? navigateTo({
          pathname: `/s/iran/${filterItem.slug}`,
          search: searchParams && searchParams.toString(),
        })
      : navigateTo({
          pathname: `/s/iran/${category}/${brands}/${filterItem?.name}`,
          search: searchParams && searchParams.toString(),
        });
  };

  return (
    <div
      onClick={handleScrollItems}
      className='sub-cat-items-box w-full h-auto bg-gray-50  border-b-[1px] border-t-[1px]'
    >
      <ul className='w-auto  flex overflow-x-scroll  m-0 py-1 '>
        {computeCatList?.map((item) => {
          return (
            <li
              className='min-w-auto flex flex-col items-center gap-2  '
              key={item.id}
            >
              <a
                href={
                  item.slug !== undefined
                    ? `/s/iran/${item.slug}`
                    : `/s/iran/${category}/${brands}/${item.name}`
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
