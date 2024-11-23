import 'moment/locale/fa'; // Load Persian (Farsi) locale for relative time
import momentJalaali from 'moment-jalaali';
momentJalaali.loadPersian({ usePersianDigits: true });
import { useNavigate } from 'react-router-dom';
import { navTo } from '../../../functions/globals/navTo';
export function ContactItem({ index, contactName, contact }) {
  const navigateTo = useNavigate();
  // Open Chat PV
  const handleOpenChat = (id) => {
    navTo(`/myAccount/messages/${id}`, '', navigateTo);
  };
  return (
    <>
      <div
        onClick={() => handleOpenChat(contact.adId)}
        key={index}
        className='w-full border rounded-3xl p-1 cursor-pointer'
      >
        <div className='w-full  p-3 flex gap-4 rounded-3xl transition-all hover:bg-gray-50  items-center'>
          <img className='w-14 h-12 rounded-full bg-gray-100 '></img>
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
