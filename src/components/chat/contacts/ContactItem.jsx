import 'moment/locale/fa'; // Load Persian (Farsi) locale for relative time
import momentJalaali from 'moment-jalaali';
momentJalaali.loadPersian({ usePersianDigits: true });
import { useNavigate } from 'react-router-dom';
import { navTo } from '../../../functions/globals/navTo';

import defaultPrifile from '../../../assets/img/images.png';

export function ContactItem({ index, contactName, contact }) {
  const navigateTo = useNavigate();
  const baseURL = import.meta.env.VITE_BASE_URL;
  // Open Chat PV
  const handleOpenChat = (id) => {
    navTo(`/myAccount/messages/${id}`, '', navigateTo);
  };
  return (
    <>
      <div
        onClick={() => handleOpenChat(contact.adId)}
        key={index}
        className='w-full border rounded-3xl p-1 bg-white cursor-pointer'
      >
        <div className='w-full  p-3 flex gap-2 rounded-3xl transition-all hover:bg-gray-50  items-center'>
          {contact.photo.length > 0 ? (
            <img
              src={`${baseURL}/${contact.photoPath}/${contact.adId}/${contact.photo[0].name}`}
              className='w-14 h-14 rounded-full  '
            />
          ) : (
            <img src={defaultPrifile} className='w-14 h-14 rounded-full  ' />
          )}
          <div className='w-[95%] flex flex-col items-start gap-3'>
            <p ref={contactName} className='text-[0.7rem] '>
              {contact.adName}
            </p>
            <p className='text-[0.7rem] text-gray-200 self-end'>
              {momentJalaali(contact.createAd).locale('fa').fromNow()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
