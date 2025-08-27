import offline from '../../public/img/offline.svg';

export default function Offline() {
  return (
    <div className='w-full h-full fixed inset-0 flex items-center justify-center gap-10 flex-col'>
      <img className='w-[50%] h-[50%] ' src={offline} />
      <div>
        <span className='w-auto h-11 text-white text-[0.8rem] text-center p-3 rounded-lg hover:opacity-[0.7] block bg-[#84105c]'>
          اتصال اینترنت قطع شد
        </span>
      </div>
    </div>
  );
}
