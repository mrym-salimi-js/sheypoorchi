import { useContext, useEffect, useRef } from 'react';
import { ThumbnailList } from './ThumbnailList';
import { SingleContext } from '../../../pages/Single';

export function GalleryThumbnail({ partScreen }) {
  const { counter } = useContext(SingleContext);
  const thumbnailParentRef = useRef();

  useEffect(() => {
    if (thumbnailParentRef.current) {
      const thumbChildren = thumbnailParentRef.current.children;

      for (let i = 0; i < thumbChildren.length; i++) {
        i == counter
          ? (thumbChildren[i].children[0].style.filter = 'brightness(1)')
          : (thumbChildren[i].children[0].style.filter = 'brightness(0.5)');
      }
    }
  }, [counter]);
  // console.log(counter);
  return (
    <ThumbnailList
      partScreen={partScreen}
      thumbnailParentRef={thumbnailParentRef}
    />
  );
}
