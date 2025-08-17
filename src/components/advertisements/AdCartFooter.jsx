import { Clock, MapIcon } from '../globals/Icons';
import momentJalaali from 'moment-jalaali';
momentJalaali.loadPersian({ usePersianDigits: true });

export function AdCartFooter({ createAt, location }) {
  return (
    <div className='w-[95%] flex flex-col items-center justify-center gap-3'>
      <div className='w-[80%] h-auto  px-1    flex justify-around items-center m-auto left-0 right-0 '>
        <div className='flex gap-2 '>
          <Clock color={'#005eeb'} size={'size-4'} />
          <p className=' text-[0.7rem] text-gray-700'>
            {momentJalaali(createAt).locale('fa').fromNow()}
          </p>
        </div>
        <div className='w-[1px] h-4 bg-gray-200'></div>

        <div className='flex gap-2'>
          <MapIcon color={'#84105C'} size={'size-4'} />
          <p className=' text-[0.7rem] text-gray-700'>{location[1].name}</p>
        </div>
      </div>
      {/* <Link to={href} className=' flex items-center hover:opacity-[0.7]  gap-2'>
        <p className='text-[#d1d1d1] text-[0.8rem]'>مشاهده آگهی</p>

        <ArrowLeft color={'#d1d1d1'} size={'size-4'} stroke={1.5} />
      </Link> */}
    </div>
  );
}
