import Cookies from 'js-cookie';
import ChatPV from '../../components/chat/pv/ChatPV';
import ContactsList from '../../components/chat/contacts/ContactsList';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../components/user/menu/Menu';

export default function MyAccount() {
  const userToken = Cookies.get('user-Token');
  const [pvShow, setPvShow] = useState(false);
  const [contactList, setContactList] = useState();
  const params = useParams();

  // contactList && console.log(contactList);

  useEffect(() => {
    params && params.adId ? setPvShow(true) : setPvShow(false);
  }, [params]);

  return (
    <div className='w-full  h-[100%] relative flex justify-center gap-6 items-center p-2'>
      <>
        <Menu />
        <div className='w-[98%] sm:w-[85%] h-full relative flex flex-col gap-6 items-center justify-center mb-14 p-2'>
          {/*Chat Box */}
          <div className='w-full flex lg:w-[80%] relative gap-3 overflow-hidden mt-5'>
            {/*Contacts List */}
            <ContactsList
              setContactList={setContactList}
              contactList={contactList}
              userToken={userToken}
              pvShow={pvShow}
              setPvShow={setPvShow}
            />
            {/*Chat PV*/}
            <ChatPV
              userToken={userToken}
              pvShow={pvShow}
              setPvShow={setPvShow}
              contactList={contactList}
            />
          </div>
        </div>
      </>
    </div>
  );
}
