import { User } from '../globals/Icons';

export function UserAccountBtn({ handleNavTo }) {
  return (
    <a
      href='/myAccount'
      onClick={(event) => handleNavTo(event, '/myAccount')}
      className='hidden xl:block'
    >
      <div className='flex gap-2 items-center p-4 bg-pink-50  rounded-full border border-[#84105C] cursor-pointer'>
        <User color={'#84105C'} size={'size-6'} />
        <p className='text-[0.8rem] text-[#84105C]'>حساب کاربری</p>
      </div>
    </a>
  );
}
