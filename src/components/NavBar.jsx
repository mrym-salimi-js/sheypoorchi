import { Link, useNavigate } from 'react-router-dom';
import { CirclePlus, Speaker, User } from './globals/Icons';
import { getUser } from '../services/user/getUser';
import { navTo } from '../utils/globals/navTo';

export default function NavBar() {
  const navigateTo = useNavigate;
  const navIconSelected = (li) => {
    const navLis = document.querySelectorAll('.nav-li');

    navLis.forEach((liTag) => {
      liTag.children[0].classList.remove('text-[#84105C]');
    });

    li.children[0].classList.add('text-[#84105C]');
  };
  const handleNavDash = async () => {
    const user = await getUser();

    user !== 'fail'
      ? navTo(`/dashboard`, null, navigateTo)
      : navTo(`/login`, null, navigateTo);
  };

  return (
    <nav className='w-[96%] mb-4 border  h-16 xl:hidden rounded-3xl   bg-white border-gray-200 fixed bottom-0  m-auto left-0 right-0 z-[1000] py-8'>
      <ul className='w-full h-full flex gap-2 justify-around items-center'>
        <li className='nav-li h-full flex items-center cursor-pointer  '>
          <a
            href='/s/iran'
            onClick={(event) => navIconSelected(event.currentTarget)}
            className='flex flex-col gap-2 items-center'
          >
            <Speaker color={'#84105C'} size={'size-6'} />
            <p className='text-[0.7rem] text-[#84105C]'>آگهی ها</p>
          </a>
        </li>

        <li className='nav-li h-full flex  items-center cursor-pointer'>
          <Link
            onClick={
              ((event) => navIconSelected(event.currentTarget), handleNavDash())
            }
            className='flex flex-col gap-2 items-center'
          >
            <CirclePlus color={'#84105C '} size={'size-10 relative bottom-5'} />
            <p className='text-[0.7rem] text-gray-500 relative bottom-2'>
              ثبت آگهی جدید
            </p>
          </Link>
        </li>
        <li className='nav-li h-full flex items-center  cursor-pointer '>
          <Link
            onClick={(event) => {
              navIconSelected(event.currentTarget), handleNavDash();
            }}
            className='flex flex-col gap-2 items-center'
          >
            <User color={'#858383'} size={'size-6'} />
            <p className='text-[0.7rem] text-gray-500'>حساب من</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
