import ChatPV from '../../components/chat/pv/ChatPV';
import ContactsList from '../../components/chat/contacts/ContactsList';
import { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

export default function Messages() {
  const [pvShow, setPvShow] = useState(false);
  const [contacts, setContacts] = useState([]);
  const params = useParams();

  const { user, userChatContacts } = useLoaderData();
  useEffect(() => {
    params && params.adId ? setPvShow(true) : setPvShow(false);
  }, [params]);

  // console.log(userChatContacts, user);
  return (
    <div className='w-full min-h-[95vh] md:w-[66%]  lg:w-[76%] xl:w-[81%]  p-4'>
      {/*Chat Box */}
      <div className='w-full min-h-[95vh] flex bg-transparent rounded-3xl border relative  overflow-hidden '>
        {/*Chat PV*/}
        <ChatPV
          pvShow={pvShow}
          user={user?.user}
          contactList={contacts.length > 0 ? contacts : userChatContacts?.data}
        />
        {/*Contacts List */}
        <ContactsList
          setContacts={setContacts}
          contacts={contacts}
          contactList={userChatContacts?.userChatContacts?.data}
          pvShow={pvShow}
          setPvShow={setPvShow}
        />
      </div>
    </div>
  );
}
