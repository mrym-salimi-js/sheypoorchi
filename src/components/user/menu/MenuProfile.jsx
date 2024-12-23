import defaultProfile from '../../../assets/img/images.png';
export default function MenuProfile() {
  return (
    <div className='w-full p-10 pt-0 pb-0 flex items-center '>
      <div className='w-full h-auto px-2 py-4 mt-4 flex flex-col items-center justify-center gap-5 border-[#50615dd6]  border-b-[1px]'>
        <img
          className='w-16 h-16 object-cover rounded-full'
          src={defaultProfile}
        ></img>
        <p className='text-sm text-white'>مریم سلیمی</p>
      </div>
    </div>
  );
}
