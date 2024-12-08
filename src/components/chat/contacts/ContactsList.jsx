import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { ContactItem } from './ContactItem';
import { getAd } from '../../../services/getAd';
import { useParams } from 'react-router-dom';

export default function ContactsList({
  userToken,
  pvShow,
  setPvShow,
  setContactList,
  contactList,
}) {
  const [contacts, setContacts] = useState([]);
  const contactName = useRef();
  const params = useParams();
  const [newContact, setNewContact] = useState([]);

  // Get Contacts List
  useEffect(() => {
    const getContacts = async () => {
      const baseURL = import.meta.env.VITE_BASE_URL;
      try {
        const contectList = await axios.get(
          `${baseURL}/api/chat/chatContacts`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        // console.log(contectList.data);
        if (contectList.data.status === 'success') {
          setContacts(contectList.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  // Set New Contact For Starting New Chat
  useEffect(() => {
    const getAdById = async () => {
      const res = await getAd(params.adId);

      setNewContact([
        {
          adId: res.data._id,
          adName: res.data.title,
          createAd: res.data.createAd,
          photo: res.data.photo,
        },
      ]);
    };

    params?.adId && getAdById();
  }, []);

  useEffect(() => {
    const conList = contacts.concat(newContact);
    setContactList(conList);
  }, [contacts, newContact]);

  return (
    <div
      className={`p-2 h-[445px] gap-2 overflow-scroll border rounded-3xl ${
        pvShow
          ? `hidden lg:w-[30%] lg:flex lg:flex-col `
          : `w-full lg:w-[30%] flex flex-col `
      }`}
    >
      {contactList &&
        contactList?.map((contact, index) => {
          return (
            <ContactItem
              key={index}
              index={index}
              contactName={contactName}
              contact={contact}
              setPvShow={setPvShow}
            />
          );
        })}
      {/* {newContact.length > 0 &&
        newContact.map((newCon, index) => {
          return (
            <ContactItem
              key={index}
              index={index}
              contactName={contactName}
              contact={newCon}
              setPvShow={setPvShow}
            />
          );
        })} */}
    </div>
  );
}
