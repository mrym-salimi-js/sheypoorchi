import { useContext } from 'react';
import { SingleContext } from '../../../pages/Single';
import { navTo } from '../../../functions/globals/navTo';
import { useNavigate } from 'react-router-dom';

export function Connections() {
  const { _id } = useContext(SingleContext);
  const navigateTo = useNavigate();
  const handleChat = () => {
    navTo(`/myAccount/messages/${_id}`, null, navigateTo);
  };
  return (
    <div className='w-full flex flex-col gap-5 items-center border-b-[1px] p-4'>
      <div className='w-full flex  gap-3 items-center  p-2'>
        <a className='w-16 h-16 rounded-2xl overflow-hidden cursor-pointer'>
          <img
            src='https://s100.divarcdn.com/static/images/real-estate/27gm9xM1dPoaFOMjbzUTtg.jpg'
            className='w-full h-full object-cover'
          />
        </a>
        <p className='text-sm'>املاک سامیار</p>
      </div>

      <div className='w-full flex gap-3'>
        <p className='w-1/2  p-5 hover:opacity-[0.7] text-center leading-3 rounded-full bg-[#84105C] text-sm text-white cursor-pointer'>
          اطلاعات تماس
        </p>
        <p
          onClick={handleChat}
          className='w-1/2  p-5 hover:opacity-[0.7] text-center leading-3 rounded-full border border-[#84105C] bg-pink-50  text-sm text-[#84105C] cursor-pointer'
        >
          چت
        </p>
      </div>
    </div>
  );
}
