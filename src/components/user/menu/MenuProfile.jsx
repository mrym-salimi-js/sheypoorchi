import defaultProfile from '../../../assets/img/images.png';
export default function MenuProfile({ photo, name }) {
  return (
    <div className='w-full p-10 pt-0 pb-0 flex items-center '>
      <div className='w-full h-auto px-2 py-4 mt-4 flex flex-col items-center justify-center gap-5 border-[#50615dd6]  border-b-[1px]'>
        <div
          className='w-20 h-20 
    object-cover 
    rounded-[52%_48%_56%_36%] 
    rotate-[33deg]
    transform 
    hover:rotate-6 
    hover:scale-105 
    transition 
    duration-500
    bg-[#22776019] absolute top-[132px]'
        ></div>
        <img
          className='w-16 h-16 
    object-cover 
    rounded-[52%_48%_56%_36%] 
    rotate-3 
    shadow-xl 
    transform 
    hover:rotate-6 
    hover:scale-105 
    transition 
    duration-500'
          src={photo !== undefined ? photo : defaultProfile}
        ></img>
        <p className='text-sm text-white'>{name}</p>
      </div>
    </div>
  );
}
