import { useContext } from 'react';
import { SingleContext } from '../../../pages/Single';

export function ThumbnailList({ thumbnailParentRef, partScreen }) {
  const {
    adPhoto,
    photoParantRef,
    setCounter,
    setPhotoFullScreen,
    visibleThumbnailNumber,
  } = useContext(SingleContext);
  const handleShowPhoto = (e, index) => {
    if (index == visibleThumbnailNumber) {
      setCounter(index);
      setPhotoFullScreen(true);
    }

    const thumbnailSrc = e.target.closest('.thumbnail-li').children[0].src;

    if (photoParantRef.current) {
      const children = photoParantRef.current.children;

      for (let i = 0; i < children.length; i++) {
        const child = children[i].children[0];

        child.src === thumbnailSrc && setCounter(i);
      }
    }
  };
  return (
    <ul
      ref={thumbnailParentRef}
      className={`${
        partScreen ? `hidden h-16` : `flex h-full`
      } lg:flex w-auto   gap-1  ${!partScreen && `justify-center`}`}
    >
      {adPhoto !== undefined &&
        adPhoto.map((item, index) => {
          if (index > visibleThumbnailNumber && partScreen) {
            return;
          }

          return (
            <li
              key={item.id}
              onClick={(e) => {
                handleShowPhoto(e, index);
              }}
              className={`thumbnail-li ${
                !partScreen ? `min-w-[130px]` : `w-28`
              } h-full rounded-xl overflow-hidden relative flex items-center justify-center`}
            >
              <img
                className={`w-full h-full cursor-pointer object-cover brightness-0 transition-all`}
                src={item.src}
                alt=''
              />
              {partScreen && index == visibleThumbnailNumber && (
                <p className='text-white text-xl z-50 absolute cursor-pointer'>
                  {adPhoto.length - visibleThumbnailNumber}+
                </p>
              )}
            </li>
          );
        })}
    </ul>
  );
}
