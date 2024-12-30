import Cookies from 'js-cookie';
import ChatPV from '../../components/chat/pv/ChatPV';
import ContactsList from '../../components/chat/contacts/ContactsList';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Messages({ contactList }) {
  const userToken = Cookies.get('user-token');
  const [pvShow, setPvShow] = useState(false);
  const [contacs, setContacts] = useState();
  const params = useParams();

  useEffect(() => {
    params && params.adId ? setPvShow(true) : setPvShow(false);
  }, [params]);

  return (
    <div className='w-full  h-full md:w-[66%]  lg:w-[76%] xl:w-[81%]  p-4'>
      {/*Chat Box */}
      <div className='w-full h-full flex bg-white rounded-3xl border relative  overflow-hidden '>
        {/*Chat PV*/}
        <ChatPV
          userToken={userToken}
          pvShow={pvShow}
          setPvShow={setPvShow}
          contactList={contactList}
        />
        {/*Contacts List */}
        <ContactsList
          setContacts={setContacts}
          contacs={contacs}
          contactList={contactList}
          userToken={userToken}
          pvShow={pvShow}
          setPvShow={setPvShow}
        />
      </div>
    </div>
  );
}
