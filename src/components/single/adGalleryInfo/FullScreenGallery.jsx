import { CloseMark } from '../../globals/Icons';
import { GalleryPhotos } from './GalleryPhotos';
import { GalleryThumbnail } from './GalleryThumbnail';
import { scrollSlider } from '../../../utils/globals/scrollSlider';
import { useContext, useRef } from 'react';
import { SingleContext } from '../../../pages/Single';

export default function FullScreenGallery() {
  const { photoFullScreen, setPhotoFullScreen, counter, setCounter } =
    useContext(SingleContext);
  const thumbnailGrandParentRef = useRef();
  const photoGrandParentRef = useRef();

  const handleClosing = () => {
    counter > 4 && setCounter(4);

    setPhotoFullScreen(false);
  };

  const handleScrollSlider = () => {
    scrollSlider(document.querySelectorAll('.thumbnail-grand-parent'));
  };

  return (
    <>
      {photoFullScreen && (
        <div className='w-full h-full flex items-center justify-center fixed top-0 right-0 z-[10000] bg-[#2222228a]'>
          <div className='btn-parent w-8 h-8 flex items-center justify-center rounded-full bg-[#454545a5] absolute left-6 top-6 cursor-pointer hover:opacity-[0.7] z-50'>
            <CloseMark
              handleClosing={handleClosing}
              color={'#ffffff'}
              size={'size-5'}
            />
          </div>

          <div className={`w-full  flex lg:items-center h-full items-center`}>
            <div
              ref={photoGrandParentRef}
              className={`w-full h-[85%] absolute bottom-7`}
            >
              <div
                className={`flex flex-col  gap-3 overflow-hidden h-full justify-between`}
              >
                <GalleryPhotos photoGrandParentRef={photoGrandParentRef} />

                <div
                  onClick={handleScrollSlider}
                  className={`w-[98%] ${
                    photoFullScreen ? `md:w-[50%]` : `md:w-full`
                  } h-[100px]  rounded-xl absolute bottom-0 self-center z-[100000]`}
                >
                  <div
                    ref={thumbnailGrandParentRef}
                    className='thumbnail-grand-parent w-full h-full flex items-start justify-start sm:justify-center overflow-x-scroll ul-box'
                  >
                    <GalleryThumbnail />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
