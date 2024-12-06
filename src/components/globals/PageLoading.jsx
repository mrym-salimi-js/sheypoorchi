import { Speaker } from './Icons';

export default function PageLoading() {
  return (
    <>
      <div className='absolute w-full h-full bg-[#6b6b6b52] flex items-center justify-center z-[10000]'>
        <div className='  w-[80%] md:w-[30%] h-[25%] border p-6 flex flex-col rounded-3xl items-center justify-center gap-4 bg-white dark:invert'>
          <div className='flex gap-2 items-center'>
            <Speaker color={'#84105C'} size={'size-8'} />
            <h2 className='text-[#5d1142]'>شیپورچی</h2>
          </div>
          <div className='flex gap-1  '>
            <div className='h-6 w-6 bg-[#cd7fb1] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-6 w-6 bg-[#cd7fb0bf] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-6 w-6 bg-[#cd7fb098] rounded-full animate-bounce'></div>
          </div>
        </div>
      </div>
    </>
  );
}
