import { useContext, useEffect, useState } from 'react';
import PrevBtn from './PrevBtn';
import NextBtn from './NextBtn';
import { PhotoList } from './PhotoList';
import { SingleContext } from '../../../pages/Single';

export function GalleryPhotos({ photoGrandParentRef, partScreen }) {
  const { adPhoto, counter, setCounter } = useContext(SingleContext);
  const [phothoWidth, setPhotoWidth] = useState(0);
  const [prevBtn, setPrevBtn] = useState(false);
  const [nextBtn, setNextBtn] = useState(false);

  setInterval(() => {
    photoGrandParentRef.current &&
      setPhotoWidth(photoGrandParentRef.current.clientWidth);
  }, 100);

  useEffect(() => {
    adPhoto.length == 1 || counter == adPhoto.length - 1
      ? setNextBtn(false)
      : setNextBtn(true);
    counter != 0 ? setPrevBtn(true) : setPrevBtn(false);
  }, [counter]);

  const handleNextMovment = () => {
    nextBtn && setCounter(counter + 1);
  };

  const handlePrevMovment = () => {
    prevBtn && setCounter(counter - 1);
  };
  return (
    <div className='relative flex items-center '>
      {nextBtn && <NextBtn handleNextMovment={handleNextMovment} />}

      {phothoWidth > 0 && (
        <PhotoList phothoWidth={phothoWidth} partScreen={partScreen} />
      )}

      {prevBtn && <PrevBtn handlePrevMovment={handlePrevMovment} />}
    </div>
  );
}
