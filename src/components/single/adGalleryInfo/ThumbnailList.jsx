import { useContext } from 'react';
import { SingleContext } from '../../../pages/Single';

export function ThumbnailList({ thumbnailParentRef, partScreen }) {
  const {
    _id,
    photo,
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
      } lg:flex w-auto   gap-2  ${!partScreen && `justify-center`}`}
    >
      {photo !== undefined &&
        photo.map((item, index) => {
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
                !partScreen ? `min-w-[130px]` : `w-20`
              } h-full rounded-xl overflow-hidden relative flex items-center justify-center`}
            >
              <img
                className={`w-full h-full cursor-pointer object-cover brightness-0 transition-all`}
                src={`http://127.0.0.1:5137/img/${_id}/${item.name}`}
                alt=''
              />
              {partScreen && index == visibleThumbnailNumber && (
                <p className='text-white text-xl z-50 absolute cursor-pointer'>
                  {photo.length - visibleThumbnailNumber}+
                </p>
              )}
            </li>
          );
        })}
    </ul>
  );
}
