import { Link } from 'react-router-dom';
import { Pencil } from '../../globals/Icons';

import defaultProfile from '../../../assets/img/images.png';
export default function MenuProfile() {
  return (
    <div className='w-full p-10 pt-0 pb-0 flex items-center mt-8'>
      <div className='w-full h-auto px-2 py-4 mt-4 flex flex-col items-center justify-center gap-5 border-[#7accb6d6]  border-b-[1px]'>
        <img
          className='w-16 h-16 object-cover rounded-full'
          src={defaultProfile}
        ></img>
        <p className='text-sm text-white'>مریم سلیمی</p>
        <Link
          to={'/myAccount/editMe'}
          className=' cursor-pointer flex items-center'
        >
          <Pencil color={'#227760'} size={'size-6'} />
        </Link>
      </div>
    </div>
  );
}
