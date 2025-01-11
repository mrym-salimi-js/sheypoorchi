import { useEffect, useRef, useState } from 'react';
import { ContactItem } from './ContactItem';
import { getAd } from '../../../services/getAd';
import { useParams } from 'react-router-dom';

export default function ContactsList({
  pvShow,
  setPvShow,
  contactList,
  contacts,
  setContacts,
}) {
  const contactName = useRef();
  const params = useParams();

  const [newContact, setNewContact] = useState([]);

  // Set New Contact For Starting New Chat
  useEffect(() => {
    const getAdById = async () => {
      const res = await getAd(params.adId);

      setNewContact([
        {
          chatId: res.data._id,
          adName: res.data.title,
          createAt: new Date().getTime(),
          photoPath: 'img',
          photo: res.data.photo,
        },
      ]);
    };

    params?.adId && getAdById();
  }, []);

  useEffect(() => {
    const isExistContact =
      contactList?.length > 0
        ? contactList?.map((con) => {
            return con.chatId === newContact[0]?.chatId && true;
          })
        : [false];

    if (isExistContact !== undefined && isExistContact[0] === false) {
      const finalCon =
        contactList?.length > 0 ? contactList?.concat(newContact) : newContact;

      finalCon?.length > 0 && setContacts(finalCon);
    }
  }, [contactList, newContact]);

  return (
    <div
      className={`p-2 h-full gap-2 overflow-scroll border-r bg-[rgb(43,58,62)] ${
        pvShow
          ? `hidden lg:w-[30%] lg:flex lg:flex-col `
          : `w-full lg:w-[30%] flex flex-col `
      }`}
    >
      {contacts !== undefined ? (
        contacts?.map((contact, index) => {
          return (
            <ContactItem
              key={index}
              index={index}
              contactName={contactName}
              contact={contact}
              setPvShow={setPvShow}
            />
          );
        })
      ) : (
        <p className='text-md text-[#cccccc8f] text-center pt-7'>
          پیامی یافت نشد :(
        </p>
      )}

      {/* {newContact.length > 0 &&
        newContact?.map((contact, index) => {
          return (
            <ContactItem
              key={index}
              index={index}
              contactName={contactName}
              contact={contact}
              setPvShow={setPvShow}
            />
          );
        })} */}
    </div>
  );
}
