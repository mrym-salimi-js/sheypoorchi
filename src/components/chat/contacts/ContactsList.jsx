import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { ContactItem } from './ContactItem';
import { getAd } from '../../../services/getAd';
import { useParams } from 'react-router-dom';

export default function ContactsList({ userToken, pvShow, setPvShow }) {
  const [contacts, setContacts] = useState([]);
  const contactName = useRef();
  const params = useParams();
  const [newContact, setNewContact] = useState([]);

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
        // console.log(contectList.data);
        if (contectList.data.status === 'success') {
          setContacts([...contacts, contectList.data.data]);
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

  // Set Final List
  useEffect(() => {
    if (contacts.length > 0) {
      contacts.map((con) => {
        con?.adId === newContact[0]?.adId && setContacts(con);
      });
    }
  });

  return (
    <div
      className={`p-2 h-[445px] gap-2 overflow-scroll border rounded-3xl ${
        pvShow
          ? `hidden lg:w-[30%] lg:flex lg:flex-col `
          : `w-full lg:w-[30%] flex flex-col `
      }`}
    >
      {contacts.length > 0 &&
        contacts[0]?.map((contact, index) => {
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
    </div>
  );
}
