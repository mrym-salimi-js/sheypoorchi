import { useRef } from 'react';
import { GalleryThumbnail } from './GalleryThumbnail';
import { GalleryPhotos } from './GalleryPhotos';

export function Gallery({ partScreen }) {
  const photoGrandParentRef = useRef();

  return (
    <div className={`w-full flex lg:items-start items-center`}>
      <div ref={photoGrandParentRef} className={`w-full lg:w-[87%] `}>
        <div className={`flex flex-col  gap-3 overflow-hidden `}>
          <GalleryPhotos
            partScreen={partScreen}
            photoGrandParentRef={photoGrandParentRef}
          />

          <GalleryThumbnail partScreen={partScreen} />
        </div>
      </div>
    </div>
  );
}
