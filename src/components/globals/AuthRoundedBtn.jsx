import { ChevronLeft } from './Icons';
import { SpinnerLoading } from './SpinnerLoading';

export default function AuthRoundedBtn({ lable, handleBtn, loading }) {
  return (
    <button
      onClick={handleBtn}
      className='w-36 h-11 bg-[#84105C] p-3 rounded-full flex gap-3 items-center justify-around  hover:opacity-[0.9] shadow-md focus:outline-none'
    >
      <p className='text-sm text-white'>{lable}</p>

      <div className='rounded-full bg-[#89677f87] p-1 relative right-3'>
        {loading ? (
          <SpinnerLoading w={'w-5'} h={'h-5'} />
        ) : (
          <ChevronLeft color={'#ffffff'} strokeWidth={'1.5'} size={'size-5'} />
        )}
      </div>
    </button>
  );
}
