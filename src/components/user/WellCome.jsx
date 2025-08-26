import { useLoaderData } from 'react-router-dom';
import { Love } from '../globals/Icons';

export default function WellCome() {
  const { user } = useLoaderData();
  return (
    <div className='w-full border h-auto py-8 px-3 flex flex-col gap-5   bg-white p-4 rounded-3xl shadow-sm '>
      <div className='flex gap-1'>
        <h4 className='pr-4'>{`سلام ${
          user.user !== undefined && user.user?.name ? user.user?.name : `کاربر`
        } عزیز`}</h4>

        <Love color={'#ffdff4'} size={'size-6 rotate-[-20deg]'} />
      </div>
      <p className='text-gray-400 text-[0.8rem] px-4'>
        به پنل کاربری خودت خوش اومدی دوست من :)
      </p>
    </div>
  );
}
