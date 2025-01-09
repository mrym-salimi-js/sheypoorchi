import { useContext, useEffect, useState } from 'react';
import { SingleContext } from '../../../pages/Single';
import { navTo } from '../../../utils/globals/navTo';
import { useNavigate } from 'react-router-dom';
import defaultProfile from '../../../assets/img/images.png';
import axios from 'axios';
export function Connections() {
  const { _id, adCreator, setSaved } = useContext(SingleContext);
  const navigateTo = useNavigate();
  const [userProf, setUserPrpf] = useState();

  const baseURL = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    const getProf = async () => {
      const response = await fetch(`${baseURL}/api/users/${adCreator._id}`);
      setUserPrpf(response.status);

      const user = await axios.get(`${baseURL}/api/users/me`, {
        withCredentials: true,
      });
      user && user.data.data.savedAd.includes(_id) && setSaved(true);
    };
    getProf();
  }, []);

  const handleChat = () => {
    navTo(`/myAccount/messages/${_id}`, null, navigateTo);
  };
  return (
    <div className='w-full flex flex-col gap-5 items-center border-b-[1px] p-4'>
      <div className='w-full flex  gap-3 items-center  p-2'>
        <a className='w-16 h-16 rounded-full overflow-hidden cursor-pointer'>
          <img
            src={
              userProf && userProf !== 404 && adCreator.photho
                ? `${baseURL}/api/users/${adCreator._id}`
                : defaultProfile
            }
            className='w-full h-full object-cover'
          />
        </a>
        <p className='text-sm'>{adCreator?.name}</p>
      </div>

      <div className='w-full flex gap-3'>
        <p className='w-1/2  p-5 hover:opacity-[0.7] text-center leading-3 rounded-full bg-[#84105C] text-sm text-white cursor-pointer'>
          اطلاعات تماس
        </p>
        <p
          onClick={handleChat}
          className='w-1/2  p-5 hover:opacity-[0.7] text-center leading-3 rounded-full border border-[#84105C] bg-pink-50  text-sm text-[#84105C] cursor-pointer'
        >
          چت
        </p>
      </div>
    </div>
  );
}
