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
  // Open Chat PV
  const handleOpenChat = (id) => {
    navTo(`/account/messages/${id}`, '', navigateTo);
  };

  console.log(contact);
  // Get User
  const userId =
    contact?.creatorId !== undefined ? contact?.creatorId : contact?.chatId;

  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
    refetchInterval: true,
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
        className='w-full border-b p-1  cursor-pointer'
      >
        <div className='w-full  py-3 px-1 flex gap-2 transition-all hover:opacity-[0.8]  items-start'>
          <div className='min-w-12 h-12 rounded-full relative '>
            <span
              className={`w-2 h-2 border  absolute left-1 bottom-[0.2rem] z-30 rounded-full ${
                status === `online` ? `bg-green-500 ` : `bg-gray-300`
              }`}
            ></span>
            {contact.photo !== undefined && contact?.photo?.length > 0 ? (
              <img
                src={`${contact?.photo[0]?.url}`}
                className='w-12 h-12  object-cover rounded-full'
              />
            ) : (
              <img
                src={defaultPrifile}
                className='w-12 h-12 object-cover rounded-full'
              />
            )}
          </div>

          <div className='w-[95%] flex flex-col items-start gap-3'>
            <p ref={contactName} className='text-[0.7rem] text-gray-800 '>
              {contact.adName}
            </p>
            <p className='text-[0.6rem] text-gray-400 self-end'>
              {momentJalaali(contact.createAt).format('HH:mm')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
