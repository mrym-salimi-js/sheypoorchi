import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  Block,
  ChevronRight,
  Document,
  LinkFile,
  More,
  RecycleBin,
  Send,
} from '../../../components/globals/Icons';
// import { SpinnerLoading } from '../../../components/globals/SpinnerLoading';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

export default function ChatPV({ userToken, pvShow, setPvShow }) {
  const [chatSettingStatus, setChatSettingStatus] = useState(false);
  const decodedJwt = userToken && jwtDecode(userToken);
  const [messages, setMessages] = useState([]);
  const msgInput = useRef();
  const fileInput = useRef();
  const adId = '673f1b335272fd24e7ce46d4';

  const [selectedAd, setSelectedAd] = useState();

  // Just foe rerender page and change download Icon
  const [fileDlStatus, setFileDlStatus] = useState();

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
          type: 'text',
        },
      ]);
    });

    return () => socket.off('message');
  }, []);

  useEffect(() => {
    socket.on('file', ({ senderId, reciverId, fileInfo }) => {
      setMessages((prevMsg) => [
        ...prevMsg,
        {
          id: uuidv4(),
          senderId,
          reciverId,
          message: fileInfo.fileName,
          type: 'file',
        },
      ]);
    });

    return () => socket.off('file');
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
    const files = fileInput.current?.files;

    const senderId = decodedJwt?.id;
    const message = msgInput.current?.value;
    const reciverId = '67366069f2ee5825d3a4828b';

    if (files.length > 0) {
      Object.keys(files).forEach((item) => {
        const file = files[item];
        const fileInfo = {
          file: file,
          fileName: file.name.replace(/ /g, '-'),
          size: file.size,
        };
        socket.emit('uploadFile', { adId, senderId, reciverId, fileInfo });
        const downloadeds = localStorage.getItem('downloadedFiles');
        localStorage.setItem(
          'downloadedFiles',
          downloadeds ? [...[downloadeds], [file.name]] : [file.name]
        );
        setFileDlStatus(file.name);
      });
    }

    message &&
      socket.emit('sendMessage', { adId, senderId, reciverId, message });
    msgInput.current.value = '';
    fileInput.current.value = '';
  };

  // Handle More Btn
  const handleChatSetting = () => {
    setChatSettingStatus(!chatSettingStatus);
  };

  // Close Chat
  const handleExitChat = () => {
    setPvShow('');
  };

  const handleDownloadFile = async (event) => {
    // event.preventDefault();

    try {
      const href = decodeURI(event.target.closest('a').href);
      const hrefBreacks = href.split('/');
      const fileName = decodeURI(hrefBreacks[hrefBreacks.length - 1]);
      const donlodedFile = localStorage.getItem('downloadedFiles');
      if (donlodedFile?.includes(fileName)) return;
      // await fetch(href);

      localStorage.setItem(
        'downloadedFiles',
        donlodedFile ? [...[donlodedFile], [fileName]] : [fileName]
      );
      setFileDlStatus(fileName);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(fileDlStatus);

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
                  return item.type === 'file' ? (
                    <>
                      <li
                        className={`${
                          decodedJwt?.id === item.senderId
                            ? `self-start`
                            : `self-end`
                        } max-w-[80%] h-16 p-2 rounded-2xl flex flex-row-reverse gap-3 bg-white shadow-sm `}
                      >
                        <a
                          onClick={(event) => handleDownloadFile(event)}
                          className=' h-full w-12 rounded-2xl bg-gray-200 flex items-center justify-center'
                          href={`http://127.0.0.1:5137/chat/${item.senderId}-${
                            item.reciverId
                          }-${item.adId}/${decodeURI(item.message).replace(
                            / /g,
                            '-'
                          )}`}
                          download={item.message}
                        >
                          {!localStorage
                            .getItem('downloadedFiles')
                            ?.includes(item.message) && (
                            <ArrowDown
                              size={'size-6'}
                              color={'#ffffff'}
                              stroke={2}
                            />
                          )}

                          {/* {fileDlStatus === 'loading' && <SpinnerLoading />} */}

                          {localStorage
                            .getItem('downloadedFiles')
                            ?.includes(item.message) && (
                            <Document
                              size={'size-6'}
                              color={'#ffffff'}
                              stroke={2}
                            />
                          )}
                        </a>
                        <div className='flex flex-col gap-1 '>
                          <p className='text-[0.7rem]'>{item.message}</p>
                          <div className='flex gap-2 flex-row-reverse'>
                            <p className='text-gray-500 text-[0.6rem]'>
                              {item.size?.toString()?.split('').map(Number)
                                .length > 6
                                ? `${(item.size / (1024 * 1024)).toFixed(
                                    2
                                  )`mb`}`
                                : `${(item.size / 1024).toFixed(2)} kb`}
                            </p>
                            <p className='text-gray-500 text-[0.6rem]'>
                              {item.message
                                .split('.')
                                .slice(-1)[0]
                                .toUpperCase()}
                            </p>
                          </div>
                          <p className='text-[0.6rem] text-gray-300 self-end'>
                            03:65 بعد از ظهر
                          </p>
                        </div>
                      </li>
                    </>
                  ) : (
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
          <div className='w-full h-14 flex relative bg-white items-center gap-4 p-3  border-t'>
            <div className='cursor-pointer absolute h-4 top-4  self-center'>
              <LinkFile size={'size-6'} color={'gray'} />
              <input
                ref={fileInput}
                multiple
                type='file'
                className='opacity-0 z-[10000] w-6 relative bottom-6 cursor-pointer'
              />
            </div>
            <div className='w-[90%] h-full relative right-[8%] flex justify-between items-center left-0'>
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
        </>
      )}
    </div>
  );
}
