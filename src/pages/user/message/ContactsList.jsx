import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

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
      className={` lg:border-l  ${
        pvShow
          ? `hidden lg:w-[30%] lg:flex lg:flex-col`
          : `w-full lg:w-[30%] lg:flex lg:flex-col`
      }`}
    >
      <div className='h-[445px]'>
        {contacts.length > 0 &&
          contacts?.map((contact, index) => {
            return (
              <>
                <div key={index} className='w-full border-b p-1 cursor-pointer'>
                  <div className='w-full  p-2 flex flex-col hover:bg-gray-50'>
                    <div className=' flex items-center gap-3'>
                      <img className='w-10 h-10 rounded-full bg-gray-100 '></img>
                      <p ref={contactName} className='text-[0.7rem] '>
                        {contact.adName}
                      </p>
                    </div>
                    <p className='text-[0.7rem] text-gray-200 self-end'>
                      یک هفته قبل
                    </p>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}
