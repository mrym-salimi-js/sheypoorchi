import { useContext } from 'react';
import { SingleContext } from '../../../pages/Single';

export function PhotoList({ phothoWidth, partScreen }) {
  const { setCounter, setPhotoFullScreen, photoParantRef, photo, counter } =
    useContext(SingleContext);

  // const baseURL = import.meta.env.VITE_BASE_URL;
  const handlePhotoFullScreen = (index) => {
    setCounter(index);
    setPhotoFullScreen(true);
  };
  return (
    <ul
      ref={photoParantRef}
      className={`${
        !partScreen ? `h-[480px]` : `h-[350px]`
      } flex  transition-all`}
    >
      {photo[0] &&
        photo.map((item, index) => {
          return (
            <li
              id='1'
              key={item.id}
              style={{
                width: `${phothoWidth}px`,
                transform: `translate3d(${phothoWidth * counter}px,0px,0px)`,
                transition: 'all 0.3s ease-in-out',
              }}
              className={` h-full cursor-auto ${
                partScreen && `rounded-xl`
              } overflow-hidden flex items-center justify-center`}
            >
              <img
                onClick={() => {
                  handlePhotoFullScreen(index);
                }}
                className={`${
                  !partScreen ? `sm:w-auto w-full` : `w-full`
                } h-full object-cover`}
                src={item.url}
                loading='lazy'
                alt={item.name}
                placeholder='blur'
              />
            </li>
          );
        })}
    </ul>
  );
}
