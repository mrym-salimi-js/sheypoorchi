import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { SendFileProtalChildren } from '../protals/SendFileProtalChildren';
import { ChatHeader } from './ChatHeader';
import { ChatContent } from './ChatContent';
import ChatSender from './ChatSender';
import { useParams } from 'react-router-dom';
import { getUser } from '../../../services/user/getUser';
import getChatMessages from '../../../services/user/getChatMessages';

export default function ChatPV({ pvShow, contactList }) {
  const [messages, setMessages] = useState([]);
  const msgInput = useRef();
  const fileInput = useRef();
  const params = useParams();
  const adIdInParams = params.adId;
  const [selectedAd, setSelectedAd] = useState();
  const [selectedFiles, setSelectedFiles] = useState();
  const [groupMsgs, setGroupMsgs] = useState();
  const [senderId, setSenderId] = useState();
  let reciverId;
  let adId;

  // Just for rerender page and change download Icon
  const [fileDlStatus, setFileDlStatus] = useState();
  console.log(fileDlStatus, 'downloaded file status');

  const baseURL = import.meta.env.VITE_BASE_URL;
  // Backend url
  const socket = io(`${baseURL}`);

  //Get AdId
  const sa = selectedAd !== undefined && Object.entries(selectedAd);
  adId = selectedAd !== undefined ? sa[sa?.length - 1][1]._id : adIdInParams;

  // Get Each Message Text By every Sending
  useEffect(() => {
    socket.on('message', ({ adId, senderId, reciverId, message }) => {
      setMessages((prevMsg) => [
        ...prevMsg,
        {
          id: uuidv4(),
          senderId,
          reciverId,
          adId,
          message,
          type: 'text',
        },
      ]);
    });

    return () => socket.off('message');
  }, []);

  // Get Each Message File By every Sending
  useEffect(() => {
    socket.on('file', ({ adId, senderId, reciverId, fileInfo }) => {
      setMessages((prevMsg) => [
        ...prevMsg,
        {
          id: uuidv4(),
          senderId,
          reciverId,
          adId,
          message: fileInfo.fileName,
          type: 'file',
        },
      ]);
    });

    return () => socket.off('file');
  }, []);

  // Get All Message Of Chat
  useEffect(() => {
    setMessages([]);
    const getAllMsg = async () => {
      const msgList = await getChatMessages(adIdInParams);

      if (msgList) {
        // setMessages([]);
        msgList?.message?.map((item) => {
          setMessages((prevMessages) => [...prevMessages, item]);
        });
        msgList.ad && setSelectedAd(msgList.ad);
      }
    };
    getAllMsg();
  }, [params]);

  // Groped Messages For Use In Ad Host Chat
  useEffect(() => {
    const separatedByAdId = messages?.reduce((acc, message) => {
      if (!acc[message.adId]) {
        acc[message.adId] = [];
      }
      acc[message.adId].push(message);
      return acc;
    }, {});

    setGroupMsgs(separatedByAdId);
  }, [messages]);

  // Get  SenderId
  useEffect(() => {
    // UserId
    const user = getUser();
    user && setSenderId(user?._id);

    getUser();
  }, [params]);

  // Get ReciverId
  contactList !== undefined &&
    contactList?.map((con) => {
      if (con.chatId === adIdInParams) {
        con.creatorId !== undefined
          ? (reciverId = con.creatorId)
          : (reciverId = con.chatId);
      }
    });

  // Send Message
  const handleSendingMsg = () => {
    const files = fileInput.current?.files;

    const message = msgInput.current?.value;

    if (files.length > 0) {
      Object.keys(files).forEach((item) => {
        const file = files[item];
        const fileInfo = {
          file: file,
          fileName: file.name.replace(/ /g, '-'),
          size: file.size,
        };

        senderId &&
          reciverId &&
          adId &&
          socket.emit('uploadFile', { adId, senderId, reciverId, fileInfo });
        const downloadeds = localStorage.getItem('downloadedFiles');
        localStorage.setItem(
          'downloadedFiles',
          downloadeds ? [...[downloadeds], [file.name]] : [file.name]
        );
        setFileDlStatus(file.name);
        setSelectedFiles('');
      });
    }

    message &&
      socket.emit('sendMessage', { adId, senderId, reciverId, message });
    msgInput.current.value = '';
    fileInput.current.value = '';
  };

  // console.log(messages);

  return (
    <div
      className={` h-full  overflow-hidden justify-between  ${
        pvShow
          ? `w-full lg:w-[70%] flex flex-col `
          : `hidden lg:w-[70%] lg:flex flex-col `
      }`}
    >
      {/* Sending File Protal */}
      {selectedFiles && (
        <SendFileProtalChildren
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          handleSendingMsg={handleSendingMsg}
        />
      )}
      {pvShow && (
        <>
          {/*Chat Header */}
          {contactList !== undefined && (
            <ChatHeader contactList={contactList} />
          )}
          {/*Chat Content */}
          <ChatContent
            selectedAd={selectedAd}
            setFileDlStatus={setFileDlStatus}
            messages={
              selectedAd !== undefined && selectedAd.length > 0
                ? groupMsgs
                : messages
            }
            senderId={senderId}
          />

          {/*Message Sender Box */}
          <ChatSender
            setSelectedFiles={setSelectedFiles}
            fileInput={fileInput}
            msgInput={msgInput}
            handleSendingMsg={handleSendingMsg}
          />
        </>
      )}
    </div>
  );
}
