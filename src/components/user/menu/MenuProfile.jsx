import defaultProfile from '../../../assets/img/images.png';
export default function MenuProfile({ photo, name }) {
  const baseURL = import.meta.env.VITE_BASE_URL;

  return (
    <div className='w-full p-10 pt-0 pb-0 flex items-center '>
      <div className='w-full h-auto px-2 py-4 mt-4 flex flex-col items-center justify-center gap-5 border-[#50615dd6]  border-b-[1px]'>
        <img
          className='w-16 h-16 object-cover rounded-full'
          src={
            photo !== undefined
              ? `${baseURL}/user/img/${photo}`
              : defaultProfile
          }
        ></img>
        <p className='text-sm text-white'>{name}</p>
      </div>
    </div>
  );
}
