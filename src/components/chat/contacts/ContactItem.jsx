import 'moment/locale/fa'; // Load Persian (Farsi) locale for relative time
import momentJalaali from 'moment-jalaali';
momentJalaali.loadPersian({ usePersianDigits: true });
import { useNavigate } from 'react-router-dom';
import { navTo } from '../../../utils/globals/navTo';

import defaultPrifile from '../../../assets/img/images.png';
import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../../../services/user/getUserById';
import { useEffect, useState } from 'react';

export function ContactItem({ index, contactName, contact }) {
  const navigateTo = useNavigate();
  const baseURL = import.meta.env.VITE_BASE_URL;
  // Open Chat PV
  const handleOpenChat = (id) => {
    navTo(`/messages/${id}`, '', navigateTo);
  };

  // Get User
  const userId =
    contact?.creatorId !== undefined ? contact?.creatorId : contact?.chatId;

  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
    refetchInterval: 5000,
  });

  // Set User Status
  const [status, setStatus] = useState('offline');
  useEffect(() => {
    user !== undefined && setStatus(user?.data?.status);
  }, [user]);
  return (
    <>
      <div
        onClick={() => handleOpenChat(contact.chatId)}
        key={index}
        className='w-full border-b-[1px] border-gray-600 p-1  cursor-pointer'
      >
        <div className='w-full  py-3 px-1 flex gap-2 transition-all hover:opacity-[0.8]  items-start'>
          <div className='min-w-12 h-12 rounded-full relative '>
            <span
              className={`w-2 h-2 border  absolute left-1 bottom-[0.2rem] z-30 rounded-full ${
                status === `online` ? `bg-green-500 ` : `bg-gray-300`
              }`}
            ></span>
            {contact.photo?.length > 0 ? (
              <img
                src={
                  contact.photoPath === 'img'
                    ? `${baseURL}/${contact.photoPath}/${contact.chatId}/${contact.photo[0].name}`
                    : `${baseURL}/${contact.photoPath}/img/${contact.photo}`
                }
                className='w-full h-full  object-fill rounded-full'
              />
            ) : (
              <img
                src={defaultPrifile}
                className='w-full h-full object-fill rounded-full'
              />
            )}
          </div>

          <div className='w-[95%] flex flex-col items-start gap-3'>
            <p ref={contactName} className='text-[0.7rem] text-gray-50 '>
              {contact.adName}
            </p>
            <p className='text-[0.6rem] text-gray-400 self-end'>
              {momentJalaali(contact.createAt).locale('fa').fromNow()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
