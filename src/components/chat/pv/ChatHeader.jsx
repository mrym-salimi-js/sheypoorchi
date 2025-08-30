import { useEffect, useState } from 'react';
import { Block, ChevronRight, More, RecycleBin } from '../../globals/Icons';
import { navTo } from '../../../utils/globals/navTo';
import { useNavigate, useParams } from 'react-router-dom';
import momentJalaali from 'moment-jalaali';
momentJalaali.loadPersian({ usePersianDigits: true });
import defaultPrifile from '../../../assets/img/images.png';
import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../../../services/user/getUserById';

export function ChatHeader({ contactList }) {
  const [chatSettingStatus, setChatSettingStatus] = useState(false);
  const [contact, setContact] = useState();

  const params = useParams();

  useEffect(() => {
    contactList?.map((con) => {
      if (con.chatId === params.adId) {
        setContact(con);
      }
    });
  });

  const navigateTo = useNavigate();
  // Handle More Btn
  const handleChatSetting = () => {
    setChatSettingStatus(!chatSettingStatus);
  };

  // Close Chat
  const handleExitChat = () => {
    navTo('/account/messages/', '', navigateTo);
  };

  useEffect(() => {
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.more-parent')) {
        setChatSettingStatus(false);
      }
    });
  });

  // Get User
  const userId =
    contact !== undefined && contact?.creatorId !== undefined
      ? contact?.creatorId
      : contact?.chatId;

  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
    enabled: userId !== undefined, // This enables the query only if userId is not undefined
    refetchInterval: true,
  });

  // Set User Status
  const [status, setStatus] = useState('offline');
  useEffect(() => {
    user !== undefined && setStatus(user?.data?.status);
  }, [user]);
  return (
    <div className='w-full p-3 relative  flex justify-between items-center '>
      <div className='flex gap-3 items-center z-50'>
        <div onClick={handleExitChat} className='cursor-pointer'>
          <ChevronRight size={'size-5'} color={'#3b3a3a'} strokeWidth={2} />
        </div>
        {contact?.photo !== undefined && contact?.photo?.length > 0 ? (
          <img
            src={`${contact?.photo[0]?.url}`}
            className='w-10 h-10 rounded-full'
          />
        ) : (
          <img src={defaultPrifile} className='w-10 h-10 rounded-full  ' />
        )}{' '}
        <div className='flex flex-col gap-1'>
          <p className='text-[0.8rem] '>{contact && contact?.adName}</p>

          <p className={`text-gray-300 text-[0.7rem]`}>
            {status === 'onlone'
              ? 'انلاین'
              : `اخرین بازدید  ${momentJalaali(user?.data?.lastSeen).format(
                  'HH:mm'
                )}`}
          </p>
        </div>
      </div>
      <div
        className='cursor-pointer more-parent transition-all'
        onClick={handleChatSetting}
      >
        <More size={'size-6'} color={'black'} />
      </div>
      {/*Chat Settings */}
      {chatSettingStatus && (
        <div className='w-32 h-auto  border rounded-lg bg-white overflow-hidden absolute top-9 left-10  flex flex-col shadow-sm z-50'>
          <span className='flex p-2 gap-2  items-center cursor-pointer hover:bg-gray-50'>
            <Block size={'size-4'} color={'black'} />
            <p className='text-[0.6rem] '>مسدود کردن کاربر</p>
          </span>
          <span className='flex p-2 gap-2  items-center cursor-pointer hover:bg-gray-50'>
            <RecycleBin size={'size-4'} color={'black'} />
            <p className='text-[0.6rem] '>حذف گفتگو</p>
          </span>
        </div>
      )}
    </div>
  );
}
