import { useContext, useEffect, useRef } from 'react';
import { ThumbnailList } from './ThumbnailList';
import { SingleContext } from '../../../pages/Single';

export function GalleryThumbnail({ partScreen }) {
  const { counter, photoFullScreen } = useContext(SingleContext);
  const thumbnailParentRef = useRef();

  const itemRefs = useRef([]);

  useEffect(() => {
    if (thumbnailParentRef.current) {
      const thumbChildren = thumbnailParentRef.current.children;

      for (let i = 0; i < thumbChildren.length; i++) {
        i === counter
          ? (thumbChildren[i].children[0].style.filter = 'brightness(1)')
          : (thumbChildren[i].children[0].style.filter = 'brightness(0.5)');
      }

      if (photoFullScreen) {
        // Scroll into seelected item
        if (itemRefs.current[counter]) {
          itemRefs.current[counter].scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest',
          });
        }
      } else {
        // Scroll into first item
        if (itemRefs.current[0]) {
          itemRefs.current[0].scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest',
          });
        }
      }
    }
  }, [counter]);

  return (
    <ThumbnailList
      partScreen={partScreen}
      thumbnailParentRef={thumbnailParentRef}
      itemRefs={itemRefs}
    />
  );
}
