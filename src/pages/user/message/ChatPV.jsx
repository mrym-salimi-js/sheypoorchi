import { useEffect, useRef, useState } from 'react';
import {
  Block,
  ChevronRight,
  LinkFile,
  More,
  RecycleBin,
  Send,
} from '../../../components/globals/Icons';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

export default function ChatPV({ userToken, pvShow, setPvShow }) {
  const [chatSettingStatus, setChatSettingStatus] = useState(false);
  const decodedJwt = userToken && jwtDecode(userToken);
  const [messages, setMessages] = useState([]);
  const msgInput = useRef();
  const adId = '672f47376ada6bea18209546';

  const [selectedAd, setSelectedAd] = useState();

  // Backend url
  const socket = io('http://127.0.0.1:5137');

  // Get Each Message By every Sending
  useEffect(() => {
    socket.on('message', ({ senderId, reciverId, message }) => {
      setMessages((prevMsg) => [
        ...prevMsg,
        {
          id: uuidv4(),
          senderId,
          reciverId,
          message,
        },
      ]);
    });

    return () => socket.off('message');
  }, []);

  // Get All Message Of Chat
  useEffect(() => {
    const messages = async () => {
      const msgList = await axios.get(
        `http://127.0.0.1:5137/api/chat/chatMessages/${adId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      msgList && setMessages([]),
        msgList.data.data.message.map((item) => {
          setMessages((prevMessages) => [...prevMessages, item]);
        }),
        msgList.data.data.ad && setSelectedAd(msgList.data.data.ad);
    };

    messages();
  }, []);

  // Send Message
  const handleSendingMsg = () => {
    // const chatId = 12;
    const senderId = decodedJwt?.id;
    const message = msgInput.current?.value;
    const reciverId = '67366069f2ee5825d3a4828b';
    socket.emit('sendMessage', { adId, senderId, reciverId, message });
    msgInput.current.value = '';
  };

  // Handle More Btn
  const handleChatSetting = () => {
    setChatSettingStatus(!chatSettingStatus);
  };

  // Close Chat
  const handleExitChat = () => {
    setPvShow('');
  };

  return (
    <div
      className={` bg-[#fdb274] overflow-hidden ${
        pvShow
          ? `w-full lg:w-[70%] lg:flex lg:flex-col lg:gap-2`
          : `hidden lg:w-[70%] lg:flex lg:flex-col gap-2`
      }`}
    >
      {pvShow && (
        <>
          {/*Chat Header */}
          <div className='w-full p-3 bg-white  flex justify-between border-b'>
            <div className='flex gap-3 items-center'>
              <div onClick={handleExitChat} className='cursor-pointer'>
                <ChevronRight
                  size={'size-5'}
                  color={'#3b3a3a'}
                  strokeWidth={2}
                />
              </div>
              <img className='w-8 h-8 rounded-full bg-gray-100 '></img>
              <div className='flex flex-col gap-3'>
                <p className='text-[0.8rem] '>{pvShow.user}</p>
                {/* <p className='text-[0.6rem] '></p> */}
              </div>
            </div>
            <div className='cursor-pointer' onClick={handleChatSetting}>
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
          {/*Chat Content */}
          <div className='w-full h-[330px] flex items-end '>
            <ul className='w-full h-full p-2 flex flex-col gap-3 items-start overflow-y-scroll'>
              {selectedAd && (
                <li
                  className={`self-start max-w-[80%] py-2 px-3 rounded-2xl flex flex-col gap-2 bg-white shadow-sm `}
                >
                  <div className='w-full flex flex-col gap-3'>
                    <img className='w-full h-20 rounded-2xl border overflow-hidden'></img>
                    <p className='text-[0.7rem] '>{selectedAd[0].title}</p>
                  </div>
                </li>
              )}
              {messages?.length > 0 &&
                messages.map((item) => {
                  return (
                    <>
                      <li
                        className={`${
                          decodedJwt?.id === item.senderId
                            ? `self-start`
                            : `self-end`
                        } max-w-[80%] py-2 px-6 rounded-2xl flex flex-col gap-2 bg-white shadow-sm `}
                      >
                        <p className='text-[0.7rem]'>{item.message}</p>
                        <p className='text-[0.6rem] text-gray-300 self-end'>
                          03:65 بعد از ظهر
                        </p>
                      </li>
                    </>
                  );
                })}
            </ul>
          </div>
          {/*Message Sender Box */}
          <div className='w-full h-14 flex justify-start bg-white items-center gap-4 p-3  border-t'>
            <div className='cursor-pointer'>
              <LinkFile size={'size-6'} color={'gray'} />
            </div>
            <input
              ref={msgInput}
              type='text'
              placeholder='پیام'
              className=' w-[90%] text-sm text-gray-400 outline-none'
            />
            <div className='cursor-pointer' onClick={handleSendingMsg}>
              <Send size={'size-6'} color={'orange'} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
