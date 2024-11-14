import { useEffect, useRef, useState } from 'react';
import {
  Block,
  LinkFile,
  More,
  RecycleBin,
  Send,
} from '../../components/globals/Icons';
import { Header } from '../../components/header/Header';
import NavBar from '../../components/NavBar';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export default function MyAccount() {
  const msgInput = useRef();
  const [chatSettingStatus, setChatSettingStatus] = useState(false);
  const [messages, setMessages] = useState([]);

  const userToken = Cookies.get('user-Token');
  const decodedJwt = userToken && jwtDecode(userToken);

  const handleChatSetting = () => {
    setChatSettingStatus(!chatSettingStatus);
  };

  useEffect(() => {
    const messages = async () => {
      const msgList = await axios.get(
        `http://127.0.0.1:5137/api/chat/ChatMessages/${decodedJwt?.id}`
      );
      msgList && setMessages([]),
        msgList.data.data.map((item) => {
          setMessages((prevMessages) => [...prevMessages, item]);
          // console.log(item);
        });
    };

    messages();
  }, []);

  console.log(decodedJwt.id);
  // Backend url
  const socket = io('http://127.0.0.1:5137');

  useEffect(() => {
    socket.on(
      'message',
      ({ senderId, reciverId = '67366069f2ee5825d3a4828b', message }) => {
        setMessages((prevMsg) => [
          ...prevMsg,
          {
            id: uuidv4(),
            senderId,
            reciverId,
            message,
          },
        ]);
      }
    );

    return () => socket.off('receiveMessage');
  }, []);
  // console.log(messages);

  const handleSendingMsg = () => {
    const chatId = 12;
    const senderId = decodedJwt?.id;
    const message = msgInput.current?.value;
    const reciverId = '673488e894e5334d961020f0';
    socket.emit('sendMessage', { chatId, senderId, reciverId, message });
    msgInput.current.value = '';
  };
  return (
    <div className='w-[98%] sm:w-[85%] h-full relative flex flex-col gap-6 items-center mb-14  p-2'>
      <Header />

      {/*Chat Box */}
      <div className='w-full flex lg:w-[80%] relative border rounded-xl overflow-hidden mt-5'>
        {/*Contacts List */}
        <div className='w-full lg:w-[30%] flex flex-col lg:border-l '>
          <div className='h-[445px]'>
            <div className='w-full border-b p-1 cursor-pointer'>
              <div className='w-full  p-2 flex flex-col hover:bg-gray-50'>
                <div className=' flex items-center gap-3'>
                  <img className='w-10 h-10 rounded-full bg-gray-100 '></img>
                  <p className='text-[0.7rem] '>فروش مسکونی تهران</p>
                </div>
                <p className='text-[0.7rem] text-gray-200 self-end'>
                  یک هفته قبل
                </p>
              </div>
            </div>
          </div>
        </div>
        {/*Chat Content */}
        <div className='hidden lg:w-[70%] lg:flex flex-col gap-2 bg-[#fdb274] overflow-hidden '>
          {/*Chat Header */}
          <div className='w-full p-3 bg-white  flex justify-between border-b'>
            <div className='flex flex-col gap-3'>
              <p className='text-[0.8rem] '>فروش مسکونی تهران</p>
              {/* <p className='text-[0.6rem] '></p> */}
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
                <span className='flex p-2 gap-2 border-b items-center cursor-pointer hover:bg-gray-50'>
                  <RecycleBin size={'size-4'} color={'black'} />
                  <p className='text-[0.6rem] '>حذف گفتگو</p>
                </span>
              </div>
            )}
          </div>
          {/*Chat Content */}
          <div className='w-full h-[330px] flex items-end overflow-hidden'>
            <ul className='w-full p-2 flex flex-col gap-3 items-start'>
              {messages?.length > 0 &&
                messages.map((item) => {
                  console.log(item.senderId);
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
        </div>
      </div>
      <NavBar />
    </div>
  );
}
