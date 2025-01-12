import ChatPV from '../../components/chat/pv/ChatPV';
import ContactsList from '../../components/chat/contacts/ContactsList';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChatContacts } from '../../services/user/getChatContacts';
import { useQuery } from '@tanstack/react-query';

export default function Messages() {
  const [pvShow, setPvShow] = useState(false);
  const [contacts, setContacts] = useState([]);
  const params = useParams();

  const { data } = useQuery({
    queryKey: ['userChats'],
    queryFn: getChatContacts,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    params && params.adId ? setPvShow(true) : setPvShow(false);
  }, [params]);

  return (
    <div className='w-full  h-full md:w-[66%]  lg:w-[76%] xl:w-[81%]  p-4'>
      {/*Chat Box */}
      <div className='w-full h-full flex bg-white rounded-3xl border relative  overflow-hidden '>
        {/*Chat PV*/}
        <ChatPV
          pvShow={pvShow}
          contactList={contacts.length > 0 ? contacts : data?.data}
        />
        {/*Contacts List */}
        <ContactsList
          setContacts={setContacts}
          contacts={contacts}
          contactList={data?.data}
          pvShow={pvShow}
          setPvShow={setPvShow}
        />
      </div>
    </div>
  );
}
