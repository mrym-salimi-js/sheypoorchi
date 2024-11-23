import { useEffect, useRef, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { SendFileProtalChildren } from '../protals/SendFileProtalChildren';
import { ChatHeader } from './ChatHeader';
import { ChatContent } from './ChatContent';
import ChatSender from './ChatSender';
import { useParams } from 'react-router-dom';

export default function ChatPV({ userToken, pvShow }) {
  const decodedJwt = userToken && jwtDecode(userToken);
  const [messages, setMessages] = useState([]);
  const msgInput = useRef();
  const fileInput = useRef();
  const params = useParams();
  const adId = params.adId;
  const [selectedAd, setSelectedAd] = useState();
  const [selectedFiles, setSelectedFiles] = useState();
  const [contact, setContact] = useState();

  // Just foe rerender page and change download Icon
  const [fileDlStatus, setFileDlStatus] = useState();

  // Backend url
  const socket = io('http://127.0.0.1:5137');

  // Get Each Message Text By every Sending
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

  // Get Each Message File By every Sending
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
    setMessages([]);
    setContact('');
    const messages = async () => {
      const msgList = await axios.get(
        `http://127.0.0.1:5137/api/chat/chatMessages/${adId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      msgList && setMessages([]), setContact(msgList.data.data.contact);
      msgList.data.data.message.map((item) => {
        setMessages((prevMessages) => [...prevMessages, item]);
      }),
        msgList.data.data.ad && setSelectedAd(msgList.data.data.ad);
    };
    adId && messages();
  }, [params]);

  // Send Message
  const handleSendingMsg = () => {
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
        setSelectedFiles('');
      });
    }

    message &&
      socket.emit('sendMessage', { adId, senderId, reciverId, message });
    msgInput.current.value = '';
    fileInput.current.value = '';
  };

  return (
    <div
      className={` bg-[#ffffff] overflow-hidden p-2 border rounded-3xl ${
        pvShow
          ? `w-full lg:w-[70%] flex flex-col gap-1`
          : `hidden lg:w-[70%] lg:flex flex-col gap-1`
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
          <ChatHeader contact={contact} />
          {/*Chat Content */}
          <ChatContent
            selectedAd={selectedAd}
            setFileDlStatus={setFileDlStatus}
            messages={messages}
            decodedJwt={decodedJwt}
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
