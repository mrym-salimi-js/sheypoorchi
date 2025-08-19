import { useContext, useRef } from 'react';
import { SingleContext } from '../../../pages/Single';
import { navTo } from '../../../utils/globals/navTo';
import { useNavigate } from 'react-router-dom';
import defaultProfile from '../../../assets/img/images.png';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../../services/user/getUser';

export function Connections() {
  const { _id, adCreator, chat, phone, userId } = useContext(SingleContext);

  const navigateTo = useNavigate();
  const phoneRef = useRef();

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  const handlePhonNumber = () => {
    console.dir(phoneRef);
    phoneRef.current.innerText = '0' + phone;
  };

  const handleChat = async () => {
    const user = await getUser();
    // console.log(user);
    user !== 'fail'
      ? navTo(`/messages/${_id}`, null, navigateTo)
      : navTo(`/login`, null, navigateTo);
  };
  return (
    <div className='w-full flex flex-col gap-5 items-center border-b-[1px] p-4'>
      <div className='w-full flex  gap-3 items-center  p-2'>
        <a className='w-16 h-16 rounded-full overflow-hidden cursor-pointer'>
          <img
            src={adCreator?.photo ? adCreator?.photo : defaultProfile}
            className='w-full h-full object-cover'
          />
        </a>
        <p className='text-sm'>{adCreator?.name}</p>
      </div>
      {data !== undefined && data._id !== userId && (
        <div className='w-full flex gap-3'>
          <p
            ref={phoneRef}
            onClick={handlePhonNumber}
            className='w-full  p-5 hover:opacity-[0.7] text-center leading-3 rounded-full bg-[#84105C] text-sm text-white cursor-pointer'
          >
            اطلاعات تماس
          </p>
          {chat && (
            <p
              onClick={handleChat}
              className='w-full  p-5 hover:opacity-[0.7] text-center leading-3 rounded-full border border-[#84105C] bg-pink-50  text-sm text-[#84105C] cursor-pointer'
            >
              چت
            </p>
          )}
        </div>
      )}
    </div>
  );
}
