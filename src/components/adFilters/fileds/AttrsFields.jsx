import SingleSelected from '../../formFileds/singleSelected/SingleSelected';
import TextComponent from '../../formFileds/TextComponent';
import ToggleSwich from '../../formFileds/ToggleSwich';

export default function AttrsFields({ catAttrs, setOpenLocation }) {
  return catAttrs?.map((item, index) => {
    if (item.order == 0) {
      if (item.type == 1 || item.type == 6 || item.type == 0) {
        return (
          <>
            <div className='w-full h-auto flex flex-col gap-4' key={index}>
              <div className='w-full p-2 flex items-center'>
                <p className='text-md'>{item.title || item.name}</p>
              </div>

              <div className='w-full p-2 flex gap-4'>
                <div className='w-1/2 h-auto text-gray-500'>
                  <TextComponent
                    setOpenList={setOpenLocation}
                    adLable={'حداقل'}
                    filedType={'text'}
                  />
                </div>
                <div className='w-1/2 h-auto  text-gray-500'>
                  <TextComponent
                    setOpenList={setOpenLocation}
                    adLable={'حداکثر'}
                    filedType={'text'}
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
          <SingleSelected
            key={index}
            lable={item.name || item.title}
            allList={item.options}
          />
        );
      } else if (item.type == 7) {
        return <ToggleSwich lable={item.name || item.title} key={index} />;
      }
    }
  });
}
