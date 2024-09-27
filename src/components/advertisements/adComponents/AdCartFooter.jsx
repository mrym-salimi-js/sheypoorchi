import { Clock, MapIcon } from '../../globals/Icons';

export function AdCartFooter({ date, location }) {
  return (
    <div className='w-[80%] h-auto absolute bottom-0 px-1 py-5  border-t-[1px] flex justify-between items-center m-auto left-0 right-0 '>
      <div className='flex gap-2'>
        <Clock color={'#005eeb'} size={'size-4'} />
        <p className=' text-[0.7rem]'>{date}</p>
      </div>

      <div className='flex gap-2'>
        <MapIcon color={'#84105C'} size={'size-4'} />
        <p className=' text-[0.7rem]'>{JSON.parse(location)[1].name}</p>
      </div>
    </div>
  );
}
