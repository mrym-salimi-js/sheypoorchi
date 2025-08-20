import { Link } from 'react-router-dom';
import { Camera } from '../globals/Icons';
export function AdCartPhoto({ photo, href }) {
  // const baseURL = import.meta.env.VITE_BASE_URL;
  return (
    <>
      {photo[0] ? (
        <Link
          // onClick={handleLinkTo}
          to={href}
          className='w-28 h-28 bg-white relative rounded-2xl overflow-hidden cursor-pointer'
        >
          <img
            loading='lazy'
            className='w-full h-full object-cover'
            src={photo[0]?.url}
            alt={photo[0].name}
            placeholder='blur'
          />
        </Link>
      ) : (
        <Link
          to={href}
          className='w-28 h-28 bg-gray-10 flex items-center bg-gray-100 justify-center relative rounded-2xl overflow-hidden cursor-pointer'
        >
          <Camera color={'#cccccc'} size={'size-10'} />
          <span className='w-14 h-[2px] bg-[#cccccc] rotate-45 absolute'></span>
        </Link>
      )}
    </>
  );
}
