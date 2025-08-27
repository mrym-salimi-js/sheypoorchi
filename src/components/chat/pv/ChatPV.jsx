import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { SendFileProtalChildren } from '../protals/SendFileProtalChildren';
import { ChatHeader } from './ChatHeader';
import { ChatContent } from './ChatContent';
import ChatSender from './ChatSender';
import { useParams } from 'react-router-dom';
import getChatMessages from '../../../services/user/getChatMessages';
import { getAd } from '../../../services/getAd';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../../queryClient';

export default function ChatPV({ user, pvShow, contactList }) {
  const [messages, setMessages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState();
  const [senderId, setSenderId] = useState();
  const [reciverId, setReciverId] = useState();
  const [fileDlStatus, setFileDlStatus] = useState();

  const msgInput = useRef();
  const fileInput = useRef();
  const params = useParams();
  const adIdInParams =
    messages.length > 0 ? messages[messages.length - 1]?.ad?._id : params.adId;
  const baseURL = import.meta.env.VITE_BASE_URL;
  const socketRef = useRef();

  useEffect(() => {
    setMessages([]);
  }, [params.adId]);

  // Initialize socket once
  useEffect(() => {
    socketRef.current = io(baseURL);

    return () => {
      socketRef.current.disconnect();
    };
  }, [baseURL]);

  // Fetch all messages & selected ad

  const { data: chatMsg } = useQuery({
    queryKey: ['chat', adIdInParams],
    queryFn: () => getChatMessages(adIdInParams),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
    enabled: !!adIdInParams,
  });

  const { data: adData } = useQuery({
    queryKey: ['ad', adIdInParams],
    queryFn: () => getAd(adIdInParams),
    enabled: !!adIdInParams && chatMsg?.length === 0, // فقط وقتی پیام نیست
  });

  useEffect(() => {
    if (chatMsg?.length > 0) {
      setMessages(chatMsg);
    }
  }, [chatMsg]);

  useEffect(() => {
    if (chatMsg?.length === 0 && adData) {
      // setSelectedAd([adData.data]);
      const newItem = { ad: adData.data, messages: [] };
      setMessages((prevMessages) => [...prevMessages, newItem]);
    }
  }, [chatMsg, adData]);

  //  Check Messages Array For Sending Every Message
  const checkMessgaesArray = (prevMsg, adId, newMessage) => {
    const adIndex = prevMsg.findIndex((item) => item.ad._id === adId);
    if (adIndex > -1) {
      const updated = [...prevMsg];
      updated[adIndex].messages = [...updated[adIndex].messages, newMessage];
      return updated;
    } else {
      return [...prevMsg, { ad: { _id: adId }, messages: [newMessage] }];
    }
  };
  useEffect(() => {
    if (!socketRef.current) return;

    const handleMessage = ({ adId, senderId, reciverId, message }) => {
      setMessages((prevMsg) => {
        const newMessage = {
          _id: uuidv4(),
          senderId,
          reciverId,
          adId,
          message,
          type: 'text',
          createAt: Date.now(),
        };
        return checkMessgaesArray(prevMsg, adId, newMessage);
      });

      queryClient.invalidateQueries(['chat', adIdInParams]);
    };

    const handleFile = ({ adId, senderId, reciverId, fileInfo }) => {
      setMessages((prevMsg) => {
        const newMessage = {
          id: uuidv4(),
          senderId,
          reciverId,
          adId,
          message: fileInfo.fileName,
          type: 'file',
        };

        return checkMessgaesArray(prevMsg, adId, newMessage);
      });
      queryClient.invalidateQueries(['chat', adIdInParams]);
    };

    socketRef.current.on('message', handleMessage);
    socketRef.current.on('file', handleFile);

    return () => {
      socketRef.current.off('message', handleMessage);
      socketRef.current.off('file', handleFile);
    };
  }, []);

  // Set senderId
  useEffect(() => {
    if (user) setSenderId(user._id);
  }, [user]);

  // Set reciverId
  useEffect(() => {
    if (contactList) {
      const found = contactList.find((con) => con.chatId === adIdInParams);
      if (found) setReciverId(found.creatorId || found.chatId);
    }
  }, [contactList, adIdInParams]);

  // Send message or file
  const handleSendingMsg = () => {
    const files = fileInput.current?.files;
    const message = msgInput.current?.value;

    if (files?.length > 0) {
      Array.from(files).forEach((file) => {
        const fileInfo = {
          file,
          fileName: file.name.replace(/ /g, '-'),
          size: file.size,
        };
        if (senderId && reciverId && adIdInParams) {
          socketRef.current.emit('uploadFile', {
            adId: adIdInParams,
            senderId,
            reciverId,
            fileInfo,
          });
        }
        setFileDlStatus(file.name);
      });
      setSelectedFiles('');
      fileInput.current.value = '';
    }

    if (message) {
      setMessages((prevMsg) => {
        const newMessage = {
          id: uuidv4(),
          senderId,
          reciverId,
          adId: adIdInParams,
          message,
          type: 'text',
        };
        return checkMessgaesArray(prevMsg, adIdInParams, newMessage);
      });

      socketRef.current.emit('sendMessage', {
        adId: adIdInParams,
        senderId,
        reciverId,
        message,
      });
      msgInput.current.value = '';
    }
  };

  return (
    <div
      className={`h-[95vh] overflow-hidden justify-between ${
        pvShow
          ? 'w-full h-full lg:w-[70%] flex flex-col'
          : 'hidden  lg:w-[70%] lg:flex flex-col'
      }`}
    >
      {selectedFiles && (
        <SendFileProtalChildren
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          handleSendingMsg={handleSendingMsg}
        />
      )}
      {pvShow && (
        <>
          {contactList && <ChatHeader contactList={contactList} />}
          <ChatContent
            setFileDlStatus={setFileDlStatus}
            messages={messages}
            senderId={senderId}
            user={user}
          />
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
