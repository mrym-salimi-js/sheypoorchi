import { useEffect, useRef } from 'react';
import { ArrowDown, Document } from '../../globals/Icons';
// import moment from 'moment';
import 'moment/locale/fa'; // Load Persian (Farsi) locale for relative time
import momentJalaali from 'moment-jalaali';
momentJalaali.loadPersian({ usePersianDigits: true });

export function ChatContent({ setFileDlStatus, messages, senderId, user }) {
  const scrollRef = useRef();

  // Auto Scroll Down In Caht
  useEffect(() => {
    const chatScrollBox = scrollRef?.current;
    chatScrollBox && (chatScrollBox.scrollTop = chatScrollBox.scrollHeight);
  });
  // Download File Settings
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

  return (
    <div className='w-full h-[90%] flex items-end border-t border-b  overflow-hidden  bg-[#3a723f70]'>
      <ul
        ref={scrollRef}
        className='w-full h-full p-2 px-3 flex flex-col gap-1 items-end overflow-scroll relative'
      >
        {messages?.length > 0 &&
          messages?.map((item, index) => {
            return (
              <li
                key={index}
                className='w-full h-full flex flex-col gap-1 items-end'
              >
                <div
                  className={`${
                    user?._id !== item?.ad?.userId
                      ? `self-start bg-gray-100 `
                      : `self-end bg-[rgb(43,58,62)] text-white `
                  }   max-w-[80%] py-2 px-3 rounded-2xl flex gap-2 shadow-sm cursor-pointer`}
                >
                  <a
                    className='w-full h-full'
                    href={`/v/${item?.ad?._id}/${item?.ad?.title}`}
                  >
                    <div className='w-full flex items-center p-3 rounded-2xl border-r-[#ebebeb70] border-r-[4px] bg-[#b1bab270] gap-3'>
                      <img
                        className='w-10 h-10 rounded-lg border overflow-hidden bg-cover'
                        src={item?.ad?.photo[0]?.url}
                      ></img>
                      <p className='text-[0.7rem] text-white '>
                        {item?.ad?.title}
                      </p>
                    </div>
                  </a>
                  <span
                    className={` ${
                      user?._id !== item?.ad?.userId
                        ? `border-t-gray-100 rotate-[20deg] right-1`
                        : `border-t-[rgb(43,58,62)] rotate-[-20deg] left-1`
                    }  w-0 h-0  border-l-[8px] border-l-transparent border-t-[15px] border-r-[13px] border-r-transparent  rounded-lg absolute`}
                  ></span>
                </div>
                {item?.messages?.map((msg) => {
                  return msg.type === 'file' ? (
                    <ContentFileItem
                      senderId={senderId}
                      item={msg}
                      handleDownloadFile={handleDownloadFile}
                      key={msg._id}
                      user={user}
                    />
                  ) : (
                    <ContentTextItem
                      senderId={senderId}
                      item={msg}
                      key={msg._id}
                      user={user}
                    />
                  );
                })}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export function ContentFileItem({ item, handleDownloadFile, user }) {
  const baseURL = import.meta.env.VITE_BASE_URL;
  return (
    <li
      className={`${
        user?._id === item.senderId
          ? `self-start bg-gray-100 `
          : `self-end bg-[rgb(43,58,62)] text-white `
      }  max-w-[80%] h-22 p-2 rounded-2xl flex flex-row-reverse gap-3  shadow-sm `}
    >
      {/* File Icin */}
      <a
        onClick={(event) => handleDownloadFile(event)}
        className=' h-14 w-14 rounded-2xl border-r-[#ebebeb70] border-r-[4px] bg-[#b1bab270]  flex items-center justify-center'
        href={`${baseURL}/chat/${item.senderId}-${item.reciverId}-${
          item.adId
        }/${decodeURI(item.message).replace(/ /g, '-')}`}
        download={item.message}
      >
        {!localStorage.getItem('downloadedFiles')?.includes(item.message) && (
          <ArrowDown size={'size-6'} color={'#ffffff'} stroke={2} />
        )}

        {/* {fileDlStatus === 'loading' && <SpinnerLoading />} */}

        {localStorage.getItem('downloadedFiles')?.includes(item.message) && (
          <Document size={'size-6'} color={'#ffffff'} stroke={2} />
        )}
      </a>
      {/* File Info */}
      <div className='flex flex-col gap-1 '>
        <p className='text-[0.7rem]'>{item.message}</p>
        <div className='flex gap-2 flex-row-reverse'>
          <p className='text-gray-500 text-[0.6rem]'>
            {item.size?.toString()?.split('')?.map(Number).length > 6
              ? `${(item.size / (1024 * 1024)).toFixed(2)`mb`}`
              : `${(item.size / 1024).toFixed(2)} kb`}
          </p>
          <p className='text-gray-500 text-[0.6rem]'>
            {item.message.split('.').slice(-1)[0].toUpperCase()}
          </p>
        </div>
        <p className='text-[0.6rem] text-gray-300 self-start '>
          {momentJalaali(item.createAt).format('HH:mm')}
        </p>
      </div>

      <span
        className={`
          ${
            user?._id === item.senderId
              ? `border-t-gray-100 rotate-[20deg] right-1`
              : `border-t-[rgb(43,58,62)] rotate-[-20deg] left-1`
          } 
         
          w-0 h-0  border-l-[8px] border-l-transparent border-t-[15px] border-r-[13px] border-r-transparent  rounded-lg absolute   `}
      ></span>
    </li>
  );
}
export function ContentTextItem({ item, user }) {
  return (
    <li
      className={`${
        user?._id === item.senderId
          ? `self-start bg-gray-100 `
          : `self-end bg-[rgb(43,58,62)] text-white `
      } max-w-[80%]  p-3 rounded-2xl justify-between flex gap-2  shadow-sm `}
    >
      <div className='w-full h-auto flex flex-col gap-2'>
        <p className='max-w-[80%] overflow-hidden text-[0.7rem] text-wrap'>
          {item.message}
        </p>
        <p className='text-[0.6rem] text-gray-300 self-end'>
          {momentJalaali(item.createAt).format('HH:mm')}
        </p>
      </div>
      <span
        className={`
          ${
            user?._id === item.senderId
              ? `border-t-gray-100 rotate-[20deg] right-1`
              : `border-t-[rgb(43,58,62)] rotate-[-20deg] left-1`
          } 
         
          w-0 h-0  border-l-[8px] border-l-transparent border-t-[15px] border-r-[13px] border-r-transparent  rounded-lg absolute   `}
      ></span>
    </li>
  );
}
