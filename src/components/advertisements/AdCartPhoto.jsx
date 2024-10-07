import { Camera } from '../globals/Icons';
export function AdCartPhoto({ photo, href }) {
  return (
    <>
      {photo ? (
        <a
          href={href}
          className='w-[90%] h-[150px] relative rounded-[2rem] overflow-hidden cursor-pointer shadow-md'
        >
          <img
            className='w-full h-full object-cover'
            src={JSON.parse(photo)[0].src}
            alt=''
          />
        </a>
      ) : (
        <a
          href={href}
          className='w-[95%] h-[150px] relative rounded-[2rem] overflow-hidden cursor-pointer bg-gray-100 flex items-center justify-center shadow-md'
        >
          <Camera color={'#cccccc'} />
          <span className='w-14 h-[2px] bg-[#cccccc] rotate-45 absolute'></span>
        </a>
      )}
    </>
  );
}
