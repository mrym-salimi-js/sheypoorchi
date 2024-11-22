import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { ContactItem } from './ContactItem';

export default function ContactsList({ userToken, pvShow, setPvShow }) {
  const [contacts, setContacts] = useState([]);
  const contactName = useRef();

  // Get Contacts List
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contectList = await axios.get(
          `http://127.0.0.1:5137/api/chat/chatContacts`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (contectList.data.status === 'success') {
          setContacts([contectList.data.data]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  // Open Chat PV
  const handleOpenChat = () => {
    // console.log(contactName);
    setPvShow({ user: contactName?.current?.innerText });
  };

  return (
    <div
      onClick={handleOpenChat}
      className={`p-2 border rounded-3xl ${
        pvShow
          ? `hidden lg:w-[30%] lg:flex lg:flex-col`
          : `w-full lg:w-[30%] lg:flex lg:flex-col`
      }`}
    >
      <div className='h-[445px]'>
        {contacts.length > 0 &&
          contacts?.map((contact, index) => {
            return (
              <ContactItem
                key={index}
                index={index}
                contactName={contactName}
                contact={contact}
              />
            );
          })}
      </div>
    </div>
  );
}
