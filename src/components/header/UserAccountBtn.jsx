import { Link } from 'react-router-dom';
import { User } from '../globals/Icons';

export function UserAccountBtn() {
  return (
    <Link to='/account/dashboard'>
      <div className='flex gap-2 items-center p-4 bg-pink-50  rounded-full border border-[#84105C] cursor-pointer'>
        <User color={'#84105C'} size={'size-6'} />
        <p className='text-[0.8rem] text-[#84105C]'>حساب من</p>
      </div>
    </Link>
  );
}
