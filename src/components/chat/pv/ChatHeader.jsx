import { useEffect, useState } from 'react';
import { Block, ChevronRight, More, RecycleBin } from '../../globals/Icons';
import { navTo } from '../../../functions/globals/navTo';
import { useNavigate, useParams } from 'react-router-dom';

import defaultPrifile from '../../../assets/img/images.png';
export function ChatHeader({ contactList }) {
  const [chatSettingStatus, setChatSettingStatus] = useState(false);
  const [contact, setContact] = useState();

  const baseURL = import.meta.env.VITE_BASE_URL;

  const params = useParams();

  useEffect(() => {
    contactList?.map((con) => {
      if (con.adId === params.adId) {
        setContact(con);
      }
    });
  });
  // console.log(contactList);

  const navigateTo = useNavigate();
  // Handle More Btn
  const handleChatSetting = () => {
    setChatSettingStatus(!chatSettingStatus);
  };

  // Close Chat
  const handleExitChat = () => {
    navTo('/dashboard/messages/', '', navigateTo);
  };

  useEffect(() => {
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.more-parent')) {
        setChatSettingStatus(false);
      }
    });
  });
  return (
    <div className='w-full p-3 relative  flex justify-between items-center '>
      <div className='flex gap-3 items-center'>
        <div onClick={handleExitChat} className='cursor-pointer'>
          <ChevronRight size={'size-5'} color={'#3b3a3a'} strokeWidth={2} />
        </div>
        {contact?.photo.length > 0 ? (
          <img
            src={`${baseURL}/${contact?.photoPath}/${contact?.adId}/${contact?.photo[0].name}`}
            className='w-10 h-10 rounded-full  '
          />
        ) : (
          <img src={defaultPrifile} className='w-10 h-10 rounded-full  ' />
        )}{' '}
        <div className='flex flex-col gap-3'>
          <p className='text-[0.8rem] '>{contact && contact?.adName}</p>
          {/* <p className='text-[0.6rem] '></p> */}
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
        <div className='w-32 h-auto  border rounded-lg bg-white overflow-hidden absolute top-9 left-10  flex flex-col shadow-sm'>
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
