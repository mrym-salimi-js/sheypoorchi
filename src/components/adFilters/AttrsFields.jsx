import TextComponent from '../formFileds/TextComponent';
import ToggleSwich from '../formFileds/ToggleSwich';
import SingleSelectedSupport from './SingleSelectedSupport';

export default function AttrsFields({
  catAttrs,
  setOpenLocation,
  navigateTo,
  searchItems,
}) {
  return catAttrs?.map((item, index) => {
    if (item.order == 0) {
      return (
        <AttrsItems
          key={index}
          item={item}
          index={index}
          setOpenLocation={setOpenLocation}
          navigateTo={navigateTo}
          searchItems={searchItems}
        />
      );
    }
  });
}

export function AttrsItems({ item, setOpenLocation, navigateTo, searchItems }) {
  if (item.type == 1 || item.type == 6) {
    return (
      <>
        <div className='w-full h-auto flex flex-col gap-4'>
          <div className='w-full  flex items-center'>
            <p className='text-md'>{item.title || item.name}</p>
          </div>

          <div className='w-full flex gap-4'>
            <div className='w-1/2 h-auto text-gray-500'>
              <TextComponent
                setOpenList={setOpenLocation}
                adLable={'حداقل'}
                filedType={'text'}
                valueType={'number'}
                type={'filter'}
                queryKey={`mn${item.queryKey}`}
                searchItem={searchItems.get(`mn${item.queryKey}`)}
              />
            </div>
            <div className='w-1/2 h-auto  text-gray-500'>
              <TextComponent
                setOpenList={setOpenLocation}
                adLable={'حداکثر'}
                filedType={'text'}
                valueType={'number'}
                type={'filter'}
                queryKey={`mx${item.queryKey}`}
                searchItem={searchItems.get(`mx${item.queryKey}`)}
              />
            </div>
          </div>
        </div>
      </>
    );
  } else if (
    item.type == 2 &&
    item.analyticsKey !== 'storeroom' &&
    item.analyticsKey !== 'elevator' &&
    item.analyticsKey !== 'parking' &&
    item.analyticsKey !== 'balcony' &&
    item.dependency.length == 0
  ) {
    return (
      <SingleSelectedSupport
        lable={item.name || item.title}
        allList={item.options}
        queryKey={item.queryKey}
      />
    );
  } else if (item.type == 7) {
    return (
      <ToggleSwich
        lable={item.name || item.title}
        type={'filter'}
        queryKey={item.queryKey}
        navigateTo={navigateTo}
        queryParams={searchItems}
      />
    );
  }
}
