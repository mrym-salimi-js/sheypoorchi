import { Camera } from '../globals/Icons';
export function AdCartPhoto({ handleLinkTo, photo, href, id }) {
  console.log();
  return (
    <>
      {photo[0] ? (
        <a
          onClick={handleLinkTo}
          href={href}
          className='w-[90%] h-[150px] bg-white relative rounded-[2rem] overflow-hidden cursor-pointer shadow-md'
        >
          <img
            className='w-full h-full object-cover'
            src={`http://127.0.0.1:5137/img/${id}/${photo[0]?.name}`}
            alt={photo[0].name}
          />
        </a>
      ) : (
        <a
          href={href}
          className='w-[95%] h-[150px]  relative rounded-[2rem] overflow-hidden cursor-pointer bg-gray-100 flex items-center justify-center shadow-md'
        >
          <Camera color={'#cccccc'} size={'size-10'} />
          <span className='w-14 h-[2px] bg-[#cccccc] rotate-45 absolute'></span>
        </a>
      )}
    </>
  );
}
