import { Speaker } from './Icons';
import ThreePointsLoading from './ThreePointsLoading';

export default function PageLoading() {
  return (
    <>
      <div className='fixed top-0 left-0 w-full h-full bg-[#6b6b6b52] flex items-center justify-center z-[1000000]'>
        <div className='  w-[80%] md:w-[30%] h-[25%] border p-6 flex flex-col rounded-3xl items-center justify-center gap-4 bg-white dark:invert'>
          <div className='flex gap-2 items-center'>
            <Speaker color={'#84105C'} size={'size-8'} />
            <h2 className='text-[#5d1142]'>شیپورچی</h2>
          </div>
          <ThreePointsLoading />
        </div>
      </div>
    </>
  );
}
