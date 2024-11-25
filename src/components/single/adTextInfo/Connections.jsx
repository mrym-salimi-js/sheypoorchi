import { useContext, useEffect, useState } from 'react';
import { SingleContext } from '../../../pages/Single';
import { navTo } from '../../../functions/globals/navTo';
import { useNavigate } from 'react-router-dom';
import defaultProfile from '../../../assets/img/images.png';
export function Connections() {
  const { _id, adCreator } = useContext(SingleContext);
  const navigateTo = useNavigate();
  const [userProf, setUserPrpf] = useState();
  useEffect(() => {
    const getProf = async () => {
      const response = await fetch(
        `http://127.0.0.1:5137/api/users/${adCreator._id}`
      );
      setUserPrpf(response.status);
    };
    getProf();
  }, []);

  // console.log(userProf && userProf != 404);
  const handleChat = () => {
    navTo(`/myAccount/messages/${_id}`, null, navigateTo);
  };
  return (
    <div className='w-full flex flex-col gap-5 items-center border-b-[1px] p-4'>
      <div className='w-full flex  gap-3 items-center  p-2'>
        <a className='w-16 h-16 rounded-full overflow-hidden cursor-pointer'>
          <img
            src={
              userProf && userProf !== 404
                ? `http://127.0.0.1:5137/api/users/${adCreator._id}`
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
