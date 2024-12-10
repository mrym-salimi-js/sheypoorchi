import { Link } from 'react-router-dom';
import { Plus } from '../globals/Icons';

export function NewAdBtn() {
  return (
    <Link to='/newad'>
      <div className=' flex gap-2 items-center p-4 hover:opacity-[0.7] leading-3 rounded-full bg-[#84105C] cursor-pointer'>
        <Plus color={'#ffffff'} size={'size-6'} />
        <p className='w-auto  text-center  text-[0.8rem] text-white '>
          ثبت آگهی رایگان
        </p>
      </div>
    </Link>
  );
}
